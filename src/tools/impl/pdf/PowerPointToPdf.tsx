import { useI18n } from '@/i18n';
import { notesFor } from '@/lib/convertNotes';
import type { ToolImplementation } from '../../types';
import { OfficeConverter } from './OfficeConverter';

const PowerPointToPdf: ToolImplementation = () => {
  const { t } = useI18n();
  return (
    <OfficeConverter
      format="PowerPoint (PPTX)"
      extension="pptx"
      maxBytes={100 * 1024 * 1024}
      convert={async (bytes, _name, report) => {
        const { pptxToPdf } = await import('@/lib/pptxPdf');
        report(0, 1, t('convert.layout'));
        const out = await pptxToPdf(bytes);
        return { bytes: out.bytes, pages: out.slides, notes: notesFor({ unsupported: out.unsupported, unsupportedElements: out.unsupportedElements, unsupportedImages: out.skippedImages }) };
      }}
    />
  );
};

export default PowerPointToPdf;
