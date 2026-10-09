import { useEffect, useState } from 'react';
import { useI18n } from '@/i18n';
import { formatBytes } from '@/lib/format';
import { useObjectUrl, type QueueItem } from '@/lib/hooks';
import { Icon } from '../Icon';

export type ItemStatus = 'idle' | 'processing' | 'done' | 'error';

export interface ListItem extends QueueItem {
  status?: ItemStatus;
  message?: string;
}

function Thumb({ file, kind }: { file: File; kind: 'image' | 'pdf' }) {
  const url = useObjectUrl(kind === 'image' ? file : null);
  const [broken, setBroken] = useState(false);
  useEffect(() => setBroken(false), [file]);
  if (kind === 'image' && url && !broken) return <img className="file-thumb" src={url} alt="" loading="lazy" onError={() => setBroken(true)} />;
  return (
    <span className="file-thumb file-thumb-fallback">
      <Icon name={kind === 'pdf' ? 'file-text' : 'image'} size={22} />
    </span>
  );
}

interface Props {
  items: ListItem[];
  kind: 'image' | 'pdf';
  onRemove: (id: string) => void;
  onMove?: (from: number, to: number) => void;
  disabled?: boolean;
}

export function FileList({ items, kind, onRemove, onMove, disabled }: Props) {
  const { t } = useI18n();
  const [dragFrom, setDragFrom] = useState<number | null>(null);
  const [dragOver, setDragOver] = useState<number | null>(null);
  if (items.length === 0) return null;

  return (
    <ul className="file-list" aria-label={t('ui.fileList')}>
      {items.map((item, i) => (
        <li
          key={item.id}
          className="file-item"
          draggable={Boolean(onMove) && !disabled}
          data-dragover={dragOver === i && dragFrom !== i}
          onDragStart={() => setDragFrom(i)}
          onDragOver={(e) => {
            if (dragFrom === null) return;
            e.preventDefault();
            setDragOver(i);
          }}
          onDragEnd={() => {
            setDragFrom(null);
            setDragOver(null);
          }}
          onDrop={(e) => {
            e.preventDefault();
            if (dragFrom !== null && onMove) onMove(dragFrom, i);
            setDragFrom(null);
            setDragOver(null);
          }}
        >
          <Thumb file={item.file} kind={kind} />
          <div className="file-meta">
            <div className="file-name" title={item.file.name}>
              {item.file.name}
            </div>
            <div className="file-sub">
              {formatBytes(item.file.size)}
              {item.status === 'processing' && ` · ${t('ui.processing')}`}
              {item.status === 'done' && <span className="file-status-done"> · {t('ui.done')}</span>}
              {item.status === 'error' && <span className="file-status-error"> · {item.message ?? t('ui.failed')}</span>}
            </div>
          </div>
          {onMove && items.length > 1 && (
            <>
              <button type="button" className="icon-btn" aria-label={t('ui.moveUp', { name: item.file.name })} disabled={disabled || i === 0} onClick={() => onMove(i, i - 1)}>
                <Icon name="arrow-up" size={16} />
              </button>
              <button type="button" className="icon-btn" aria-label={t('ui.moveDown', { name: item.file.name })} disabled={disabled || i === items.length - 1} onClick={() => onMove(i, i + 1)}>
                <Icon name="arrow-down" size={16} />
              </button>
            </>
          )}
          <button type="button" className="icon-btn" aria-label={t('ui.remove', { name: item.file.name })} disabled={disabled} onClick={() => onRemove(item.id)}>
            <Icon name="x" size={18} />
          </button>
        </li>
      ))}
    </ul>
  );
}
