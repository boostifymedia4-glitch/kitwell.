import { useState } from 'react';
import { SelectField } from '@/components/tool/Fields';
import { useI18n } from '@/i18n';
import { notesFor } from '@/lib/convertNotes';
import type { ToolImplementation } from '../../types';
import { OfficeConverter } from './OfficeConverter';

type Size = 'document' | 'a4' | 'letter';

const WordToPdf: ToolImplementation = () => {
  const { t } = useI18n();
  const [size, setSize] = useState<Size>('document');
  return (
    <OfficeConverter
      format="Word (DOCX)"
      extension="docx"
      maxBytes={50 * 1024 * 1024}
      optionsKey={size}
      options={
        <SelectField
          label={t('imagesToPdf.pageSize')}
          value={size}
          onChange={setSize}
          options={[
            { value: 'document', label: t('convert.pageSize.document') },
            { value: 'a4', label: t('imagesToPdf.pageSize.a4') },
            { value: 'letter', label: t('imagesToPdf.pageSize.letter') },
          ]}
        />
      }
      convert={async (bytes, _name, report) => {
        const [{ readDocx }, { buildPdf }, { tr }] = await Promise.all([import('@/lib/docx'), import('@/lib/docPdf'), import('@/i18n/translate')]);
        const read = readDocx(bytes);
        if (read.blocks.length === 0) throw new Error(tr('err.convert.empty'));
        report(0, 1, t('convert.layout'));
        const out = await buildPdf(read.blocks, { pageSize: size === 'document' ? read.pageSize : size, landscape: read.landscape, title: read.title || undefined });
        return {
          bytes: out.bytes,
          pages: out.pages,
          notes: notesFor({ unsupported: out.unsupported, unsupportedImages: read.unsupportedImages + out.skippedImages, truncated: out.truncated, headersFooters: read.headersOrFooters, extras: read.equations + read.textBoxes }),
        };
      }}
    />
  );
};

export default WordToPdf;
