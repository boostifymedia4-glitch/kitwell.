/**
 * Reading and filling AcroForm fields (the standard fillable PDF forms). Pure functions on bytes.
 * XFA ("dynamic") forms are not supported and are reported as such.
 */
import {
  PDFButton,
  PDFCheckBox,
  PDFDropdown,
  PDFField,
  PDFName,
  PDFOptionList,
  PDFRadioGroup,
  PDFSignature,
  PDFTextField,
  StandardFonts,
  type PDFDocument,
} from '@cantoo/pdf-lib';
import { PdfError, loadPdf } from './pdfOps';

export type FieldKind = 'text' | 'checkbox' | 'radio' | 'dropdown' | 'list' | 'button' | 'signature' | 'unknown';
export type FieldValue = string | boolean | string[];

export interface FormField {
  name: string;
  kind: FieldKind;
  value: FieldValue;
  options: string[];
  maxLength?: number;
  multiline: boolean;
  multiselect: boolean;
  readOnly: boolean;
  required: boolean;
  /** 1-based number of the page that shows the field, when it can be determined. */
  page?: number;
}

export interface FormInfo {
  fields: FormField[];
  /** Fields the tool can fill (everything except buttons, signature fields and read-only fields). */
  fillable: number;
  xfa: boolean;
}

export const fieldIsFillable = (f: FormField) => !f.readOnly && f.kind !== 'button' && f.kind !== 'signature' && f.kind !== 'unknown';

function kindOf(field: PDFField): FieldKind {
  if (field instanceof PDFTextField) return 'text';
  if (field instanceof PDFCheckBox) return 'checkbox';
  if (field instanceof PDFRadioGroup) return 'radio';
  if (field instanceof PDFDropdown) return 'dropdown';
  if (field instanceof PDFOptionList) return 'list';
  if (field instanceof PDFButton) return 'button';
  if (field instanceof PDFSignature) return 'signature';
  return 'unknown';
}

/** Maps each widget annotation object to the page that contains it. */
function widgetPages(doc: PDFDocument): Map<unknown, number> {
  const map = new Map<unknown, number>();
  doc.getPages().forEach((page, i) => {
    const annots = page.node.Annots();
    if (!annots) return;
    for (let k = 0; k < annots.size(); k++) map.set(annots.lookup(k), i + 1);
  });
  return map;
}

function describe(field: PDFField, pages: Map<unknown, number>): FormField {
  const kind = kindOf(field);
  const base: FormField = {
    name: field.getName(),
    kind,
    value: '',
    options: [],
    multiline: false,
    multiselect: false,
    readOnly: field.isReadOnly(),
    required: field.isRequired(),
    page: undefined,
  };
  for (const widget of field.acroField.getWidgets()) {
    const page = pages.get(widget.dict);
    if (page) {
      base.page = page;
      break;
    }
  }
  if (field instanceof PDFTextField) {
    base.value = field.getText() ?? '';
    base.maxLength = field.getMaxLength();
    base.multiline = field.isMultiline();
  } else if (field instanceof PDFCheckBox) {
    base.value = field.isChecked();
  } else if (field instanceof PDFRadioGroup) {
    base.options = field.getOptions();
    base.value = field.getSelected() ?? '';
  } else if (field instanceof PDFDropdown) {
    base.options = field.getOptions();
    base.multiselect = field.isMultiselect();
    base.value = base.multiselect ? field.getSelected() : (field.getSelected()[0] ?? '');
  } else if (field instanceof PDFOptionList) {
    base.options = field.getOptions();
    base.multiselect = field.isMultiselect();
    base.value = field.getSelected();
  }
  return base;
}

export async function readFormFields(bytes: Uint8Array): Promise<FormInfo> {
  const doc = await loadPdf(bytes);
  const acro = doc.catalog.lookup(PDFName.of('AcroForm'));
  const xfa = Boolean(acro && 'has' in acro && (acro as unknown as { has(n: PDFName): boolean }).has(PDFName.of('XFA')));
  let fields: PDFField[];
  try {
    fields = doc.getForm().getFields();
  } catch {
    throw new PdfError('The form fields in this PDF could not be read. The file may use an unusual form structure.');
  }
  const pages = widgetPages(doc);
  const described = fields.map((f) => describe(f, pages));
  return { fields: described, fillable: described.filter(fieldIsFillable).length, xfa };
}

export interface FillOptions {
  /** Burn the filled values into the pages and remove the fields, so the form can no longer be edited. */
  flatten: boolean;
}

const encodingHint = (name: string) =>
  new PdfError(`The value of “${name}” contains a character that the form’s font cannot display. Use plain Latin letters, digits and common symbols in this field.`);

/** Writes values into the matching fields. Fields not mentioned in `values` keep their current value. */
export async function fillForm(bytes: Uint8Array, values: Record<string, FieldValue>, opts: FillOptions): Promise<Uint8Array> {
  const doc = await loadPdf(bytes);
  const form = doc.getForm();
  // The library silently turns unsupported characters into garbage, so check against the font's real character set.
  const supported = new Set((await doc.embedFont(StandardFonts.Helvetica)).getCharacterSet());
  const drawable = (text: string) => [...text].every((ch) => ch === "\n" || ch === "\r" || ch === "\t" || supported.has(ch.codePointAt(0) as number));
  for (const [name, value] of Object.entries(values)) {
    let field: PDFField;
    try {
      field = form.getField(name);
    } catch {
      throw new PdfError(`The field “${name}” does not exist in this PDF.`);
    }
    if (field.isReadOnly()) continue;
    try {
      if (field instanceof PDFTextField) {
        const text = String(value);
        const max = field.getMaxLength();
        if (max !== undefined && text.length > max) throw new PdfError(`“${name}” allows at most ${max} characters.`);
        if (!drawable(text)) throw encodingHint(name);
        if (text === '') field.setText(undefined);
        else field.setText(text);
      } else if (field instanceof PDFCheckBox) {
        if (value === true) field.check();
        else field.uncheck();
      } else if (field instanceof PDFRadioGroup) {
        if (value === '' || value === false) field.clear();
        else field.select(String(value));
      } else if (field instanceof PDFDropdown) {
        const list = Array.isArray(value) ? value : value === '' ? [] : [String(value)];
        if (list.length === 0) field.clear();
        else field.select(list);
      } else if (field instanceof PDFOptionList) {
        const list = Array.isArray(value) ? value : value === '' ? [] : [String(value)];
        if (list.length === 0) field.clear();
        else field.select(list);
      }
    } catch (err) {
      if (err instanceof PdfError) throw err;
      const message = err instanceof Error ? err.message : '';
      if (/WinAnsi|cannot encode|encode/i.test(message)) throw encodingHint(name);
      throw new PdfError(`“${name}” could not be filled: ${message || 'unknown error'}.`);
    }
  }
  try {
    form.updateFieldAppearances();
    if (opts.flatten) form.flatten();
  } catch (err) {
    const message = err instanceof Error ? err.message : '';
    if (/WinAnsi|cannot encode|encode/i.test(message)) throw new PdfError('A field contains a character that the form’s font cannot display. Use plain Latin letters, digits and common symbols.');
    throw new PdfError(`The filled form could not be saved: ${message || 'unknown error'}.`);
  }
  return doc.save();
}
