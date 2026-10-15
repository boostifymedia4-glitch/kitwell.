import { strToU8, zipSync } from 'fflate';

const W = 'xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"';
const xml = (body: string) => `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>${body}`;
const zip = (files: Record<string, string | Uint8Array>) => zipSync(Object.fromEntries(Object.entries(files).map(([k, v]) => [k, typeof v === 'string' ? strToU8(v) : v])));

/** A 1x1 PNG. */
export const PNG = Uint8Array.from(atob('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='), (c) => c.charCodeAt(0));

const run = (text: string, props = '') => `<w:r>${props ? `<w:rPr>${props}</w:rPr>` : ''}<w:t xml:space="preserve">${text}</w:t></w:r>`;
export const wp = (content: string, pPr = '') => `<w:p>${pPr ? `<w:pPr>${pPr}</w:pPr>` : ''}${content}</w:p>`;

export function makeDocx(opts: { body?: string; landscape?: boolean } = {}): Uint8Array {
  const body =
    opts.body ??
    [
      wp(run('Project plan'), '<w:pStyle w:val="Heading1"/>'),
      wp(run('This is ') + run('important', '<w:b/>') + run(' and ') + run('slanted', '<w:i/>') + run('. Zażółć gęślą jaźń.')),
      wp(run('First bullet'), '<w:numPr><w:ilvl w:val="0"/><w:numId w:val="1"/></w:numPr>'),
      wp(run('Second bullet'), '<w:numPr><w:ilvl w:val="0"/><w:numId w:val="1"/></w:numPr>'),
      wp(run('Step one'), '<w:numPr><w:ilvl w:val="0"/><w:numId w:val="2"/></w:numPr>'),
      wp(run('Step two'), '<w:numPr><w:ilvl w:val="0"/><w:numId w:val="2"/></w:numPr>'),
      `<w:tbl><w:tblPr><w:tblLook w:firstRow="1"/></w:tblPr><w:tr><w:tc>${wp(run('Item'))}</w:tc><w:tc>${wp(run('Price'))}</w:tc></w:tr><w:tr><w:tc>${wp(run('Pen'))}</w:tc><w:tc>${wp(run('3.50'))}</w:tc></w:tr></w:tbl>`,
      wp('<w:r><w:drawing><wp:inline><a:graphic><a:graphicData><a:blip r:embed="rId5"/></a:graphicData></a:graphic></wp:inline></w:drawing></w:r>'),
      wp(run('Last paragraph')),
    ].join('');
  const sect = `<w:sectPr><w:pgSz w:w="${opts.landscape ? 16838 : 11906}" w:h="${opts.landscape ? 11906 : 16838}"${opts.landscape ? ' w:orient="landscape"' : ''}/></w:sectPr>`;
  return zip({
    'word/document.xml': xml(`<w:document ${W}><w:body>${body}${sect}</w:body></w:document>`),
    'word/_rels/document.xml.rels': xml('<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId5" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/image1.png"/></Relationships>'),
    'word/media/image1.png': PNG,
    'word/styles.xml': xml(`<w:styles ${W}><w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/></w:style></w:styles>`),
    'word/numbering.xml': xml(
      `<w:numbering ${W}><w:abstractNum w:abstractNumId="0"><w:lvl w:ilvl="0"><w:numFmt w:val="bullet"/></w:lvl></w:abstractNum><w:abstractNum w:abstractNumId="1"><w:lvl w:ilvl="0"><w:numFmt w:val="decimal"/></w:lvl></w:abstractNum><w:num w:numId="1"><w:abstractNumId w:val="0"/></w:num><w:num w:numId="2"><w:abstractNumId w:val="1"/></w:num></w:numbering>`,
    ),
    'docProps/core.xml': xml('<cp:coreProperties xmlns:cp="http://x" xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:title>Plan title</dc:title></cp:coreProperties>'),
  });
}

export function makeXlsx(): Uint8Array {
  const ns = 'xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"';
  return zip({
    'xl/workbook.xml': xml(`<workbook ${ns}><sheets><sheet name="Sales" sheetId="1" r:id="rId1"/><sheet name="Notes" sheetId="2" r:id="rId2"/><sheet name="Secret" sheetId="3" state="hidden" r:id="rId3"/></sheets></workbook>`),
    'xl/_rels/workbook.xml.rels': xml(
      '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="x/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="x/worksheet" Target="worksheets/sheet2.xml"/><Relationship Id="rId3" Type="x/worksheet" Target="worksheets/sheet3.xml"/></Relationships>',
    ),
    'xl/sharedStrings.xml': xml(`<sst ${ns}><si><t>Region</t></si><si><t>Revenue</t></si><si><t>Date</t></si><si><t>Łódź</t></si><si><t>Rate</t></si></sst>`),
    'xl/styles.xml': xml(`<styleSheet ${ns}><numFmts count="1"><numFmt numFmtId="164" formatCode="#,##0.00"/></numFmts><cellXfs count="4"><xf numFmtId="0"/><xf numFmtId="164"/><xf numFmtId="14"/><xf numFmtId="9"/></cellXfs></styleSheet>`),
    'xl/worksheets/sheet1.xml': xml(
      `<worksheet ${ns}><sheetData><row r="1"><c r="A1" t="s"><v>0</v></c><c r="B1" t="s"><v>1</v></c><c r="C1" t="s"><v>2</v></c><c r="D1" t="s"><v>4</v></c></row><row r="2"><c r="A2" t="s"><v>3</v></c><c r="B2" s="1"><v>1234.5</v></c><c r="C2" s="2"><v>45000</v></c><c r="D2" s="3"><v>0.256</v></c></row><row r="3"><c r="A3" t="inlineStr"><is><t>Total</t></is></c><c r="B3" s="1"><f>SUM(B2:B2)</f><v>1234.5</v></c></row><row r="4"><c r="A4" t="b"><v>1</v></c><c r="B4"><f>1+1</f></c></row></sheetData></worksheet>`,
    ),
    'xl/worksheets/sheet2.xml': xml(`<worksheet ${ns}><sheetData/></worksheet>`),
    'xl/worksheets/sheet3.xml': xml(`<worksheet ${ns}><sheetData><row r="1"><c r="A1" t="inlineStr"><is><t>hidden</t></is></c></row></sheetData></worksheet>`),
  });
}

export function makePptx(slides = 2): Uint8Array {
  const ns = 'xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"';
  const textShape = (id: number, x: number, y: number, w: number, h: number, text: string, extra = '') =>
    `<p:sp><p:nvSpPr><p:cNvPr id="${id}" name="t${id}"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr><p:spPr><a:xfrm><a:off x="${x}" y="${y}"/><a:ext cx="${w}" cy="${h}"/></a:xfrm></p:spPr><p:txBody><a:bodyPr/><a:p><a:r><a:rPr sz="2400" b="1"${extra}/><a:t>${text}</a:t></a:r></a:p></p:txBody></p:sp>`;
  const slideXml = (n: number) =>
    xml(
      `<p:sld ${ns}><p:cSld><p:bg><p:bgPr><a:solidFill><a:srgbClr val="EEF2FF"/></a:solidFill></p:bgPr></p:bg><p:spTree>${textShape(2, 457200, 457200, 8229600, 914400, `Slide ${n} title`)}${textShape(3, 457200, 1600200, 8229600, 3000000, `Body text of slide ${n} with Привіт`)}<p:pic><p:nvPicPr><p:cNvPr id="9" name="pic"/><p:cNvPicPr/><p:nvPr/></p:nvPicPr><p:blipFill><a:blip r:embed="rId2"/></p:blipFill><p:spPr><a:xfrm><a:off x="6000000" y="4800000"/><a:ext cx="914400" cy="914400"/></a:xfrm></p:spPr></p:pic></p:spTree></p:cSld></p:sld>`,
    );
  const files: Record<string, string | Uint8Array> = {
    'ppt/presentation.xml': xml(`<p:presentation ${ns}><p:sldIdLst>${Array.from({ length: slides }, (_, i) => `<p:sldId id="${256 + i}" r:id="rId${i + 1}"/>`).join('')}</p:sldIdLst><p:sldSz cx="9144000" cy="6858000"/></p:presentation>`),
    'ppt/_rels/presentation.xml.rels': xml(`<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${Array.from({ length: slides }, (_, i) => `<Relationship Id="rId${i + 1}" Type="x/slide" Target="slides/slide${i + 1}.xml"/>`).join('')}</Relationships>`),
    'ppt/media/image1.png': PNG,
  };
  for (let i = 1; i <= slides; i++) {
    files[`ppt/slides/slide${i}.xml`] = slideXml(i);
    files[`ppt/slides/_rels/slide${i}.xml.rels`] = xml('<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId2" Type="x/image" Target="../media/image1.png"/></Relationships>');
  }
  return zip(files);
}
