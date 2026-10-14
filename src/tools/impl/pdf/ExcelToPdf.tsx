import { useI18n } from '@/i18n';
import { notesFor } from '@/lib/convertNotes';
import type { ToolImplementation } from '../../types';
import { OfficeConverter } from './OfficeConverter';

const ExcelToPdf: ToolImplementation = () => {
  const { t } = useI18n();
  return (
    <OfficeConverter
      format="Excel (XLSX)"
      extension="xlsx"
      maxBytes={50 * 1024 * 1024}
      convert={async (bytes, _name, report) => {
        const [{ readXlsx }, { buildPdf }, { tr }] = await Promise.all([import('@/lib/xlsx'), import('@/lib/docPdf'), import('@/i18n/translate')]);
        const read = readXlsx(bytes);
        if (read.sheets === 0 || read.rows === 0) throw new Error(tr('err.convert.empty'));
        report(0, 1, t('convert.layout'));
        const out = await buildPdf(read.blocks, { landscape: read.landscape, title: read.title || undefined });
        return {
          bytes: out.bytes,
          pages: out.pages,
          notes: notesFor({ unsupported: out.unsupported, truncated: out.truncated, hiddenSheets: read.hiddenSheets, cutSheets: read.cutSheets, uncalculated: read.uncalculated }),
        };
      }}
    />
  );
};

export default ExcelToPdf;
