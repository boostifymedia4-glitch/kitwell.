import { useCallback, useEffect, useState } from 'react';
import { CheckField, NumberField } from '@/components/tool/Fields';
import { OutputBox } from '@/components/tool/TextIO';
import { Icon } from '@/components/Icon';
import { useI18n } from '@/i18n';
import { generateUuid } from '@/lib/dev';
import type { ToolImplementation } from '../../types';

const UuidGenerator: ToolImplementation = () => {
  const { t } = useI18n();
  const [count, setCount] = useState<number | ''>(5);
  const [upper, setUpper] = useState(false);
  const [hyphens, setHyphens] = useState(true);
  const [braces, setBraces] = useState(false);
  const [ids, setIds] = useState<string[]>([]);

  const generate = useCallback(() => {
    const n = Math.min(1000, Math.max(1, Number(count) || 1));
    setIds(Array.from({ length: n }, generateUuid));
  }, [count]);

  useEffect(() => generate(), [generate]);

  const text = ids
    .map((id) => {
      let v = hyphens ? id : id.replace(/-/g, '');
      if (upper) v = v.toUpperCase();
      return braces ? `{${v}}` : v;
    })
    .join('\n');

  return (
    <div className="stack">
      <div className="options-grid">
        <NumberField label={t('uuidGenerator.howMany')} value={count} min={1} max={1000} onChange={setCount} />
        <div className="stack-sm">
          <CheckField label={t('uuidGenerator.uppercase')} checked={upper} onChange={setUpper} />
          <CheckField label={t('uuidGenerator.hyphens')} checked={hyphens} onChange={setHyphens} />
          <CheckField label={t('uuidGenerator.braces')} checked={braces} onChange={setBraces} />
        </div>
      </div>
      <OutputBox label={t('uuidGenerator.output')} value={text} rows={Math.min(14, Math.max(4, ids.length + 1))} filename="uuids.txt" />
      <div className="toolbar">
        <button type="button" className="btn btn-primary btn-lg" onClick={generate}>
          <Icon name="rotate-ccw" size={18} />
          {t('uuidGenerator.generate')}
        </button>
      </div>
    </div>
  );
};

export default UuidGenerator;
