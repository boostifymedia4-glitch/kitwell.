import { useEffect, useMemo, useState } from 'react';
import { useI18n } from '@/i18n';
import { formatBytes } from '@/lib/format';
import { useObjectUrl, type QueueItem } from '@/lib/hooks';
import { usePdfPreview } from '@/lib/pdfThumb';
import { Icon } from '../Icon';

export type ItemStatus = 'idle' | 'processing' | 'done' | 'error';

export interface ListItem extends QueueItem {
  status?: ItemStatus;
  message?: string;
}

const extensionOf = (name: string) => (name.includes('.') ? name.split('.').pop()!.toUpperCase().slice(0, 5) : '');

interface TileProps {
  item: ListItem;
  index: number;
  total: number;
  kind: 'image' | 'pdf';
  onRemove: (id: string) => void;
  onMove?: (from: number, to: number) => void;
  disabled?: boolean;
  dragging: boolean;
  over: boolean;
  onDragStart: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragEnd: () => void;
  onDrop: (e: React.DragEvent) => void;
  onPages: (id: string, pages: number | null) => void;
}

function FileTile({ item, index, total, kind, onRemove, onMove, disabled, dragging, over, onDragStart, onDragOver, onDragEnd, onDrop, onPages }: TileProps) {
  const { t } = useI18n();
  const imageUrl = useObjectUrl(kind === 'image' ? item.file : null);
  const [broken, setBroken] = useState(false);
  const preview = usePdfPreview(item.file, kind === 'pdf');
  useEffect(() => setBroken(false), [item.file]);
  useEffect(() => {
    if (kind === 'pdf' && preview.ready) onPages(item.id, preview.pages);
  }, [kind, preview.ready, preview.pages, item.id, onPages]);

  const name = item.file.name;
  const src = kind === 'pdf' ? preview.thumb : imageUrl;
  const sortable = Boolean(onMove) && total > 1;

  return (
    <li
      className="file-tile"
      draggable={sortable && !disabled}
      data-dragging={dragging || undefined}
      data-dragover={over || undefined}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      onDrop={onDrop}
    >
      <div className="file-tile-media">
        {src && !broken ? (
          <img src={src} alt="" loading="lazy" draggable={false} onError={() => setBroken(true)} />
        ) : (
          <span className="file-tile-fallback" aria-hidden="true">
            <Icon name={preview.locked ? 'lock' : kind === 'pdf' ? 'file-text' : 'image'} size={30} />
          </span>
        )}
        {total > 1 && <span className="file-tile-index" aria-hidden="true">{index + 1}</span>}
        {sortable && (
          <span className="file-tile-grip" aria-hidden="true">
            <Icon name="grip" size={16} />
          </span>
        )}
        <button type="button" className="file-tile-remove" aria-label={t('ui.remove', { name })} disabled={disabled} onClick={() => onRemove(item.id)}>
          <Icon name="x" size={16} />
        </button>
      </div>
      <div className="file-tile-body">
        <div className="file-name" title={name}>
          {name}
        </div>
        <div className="file-sub">
          <span className="file-badge">{extensionOf(name) || (kind === 'pdf' ? 'PDF' : 'IMG')}</span>
          {formatBytes(item.file.size)}
          {kind === 'pdf' && preview.pages !== null && ` · ${t('ui.pagesCount', { pages: preview.pages })}`}
          {preview.locked && <span className="file-status-error"> · {t('ui.passwordProtected')}</span>}
          {item.status === 'processing' && ` · ${t('ui.processing')}`}
          {item.status === 'done' && <span className="file-status-done"> · {t('ui.done')}</span>}
          {item.status === 'error' && <span className="file-status-error"> · {item.message ?? t('ui.failed')}</span>}
        </div>
      </div>
      {sortable && (
        <div className="file-tile-move">
          <button type="button" className="icon-btn" aria-label={t('ui.moveEarlier', { name })} disabled={disabled || index === 0} onClick={() => onMove!(index, index - 1)}>
            <Icon name="arrow-left" size={16} />
          </button>
          <button type="button" className="icon-btn" aria-label={t('ui.moveLater', { name })} disabled={disabled || index === total - 1} onClick={() => onMove!(index, index + 1)}>
            <Icon name="arrow-right" size={16} />
          </button>
        </div>
      )}
    </li>
  );
}

interface Props {
  items: ListItem[];
  kind: 'image' | 'pdf';
  onRemove: (id: string) => void;
  /** When given, files can be dragged into a new order, or moved earlier and later with the buttons. */
  onMove?: (from: number, to: number) => void;
  /** When given, a "Clear all" button appears in the summary bar. */
  onClear?: () => void;
  disabled?: boolean;
}

/**
 * The files a person has chosen, shown before anything is processed: a picture of each file (the first page for a PDF),
 * its name, type, size and page count, a remove button and, where the order matters, drag handles. A summary bar shows how
 * many files, how many pages and how much data were selected.
 */
export function FileList({ items, kind, onRemove, onMove, onClear, disabled }: Props) {
  const { t } = useI18n();
  const [dragFrom, setDragFrom] = useState<number | null>(null);
  const [dragOver, setDragOver] = useState<number | null>(null);
  const [pageMap, setPageMap] = useState<Record<string, number | null>>({});
  const reportPages = useMemo(() => (id: string, pages: number | null) => setPageMap((m) => (m[id] === pages ? m : { ...m, [id]: pages })), []);
  if (items.length === 0) return null;

  const totalBytes = items.reduce((n, i) => n + i.file.size, 0);
  const pagesKnown = kind === 'pdf' && items.every((i) => typeof pageMap[i.id] === 'number');
  const totalPages = pagesKnown ? items.reduce((n, i) => n + (pageMap[i.id] as number), 0) : null;

  return (
    <div className="file-area">
      {(items.length > 1 || onClear) && (
        <div className="file-summary">
          <span>
            {totalPages !== null
              ? t('ui.summaryPages', { files: items.length, pages: totalPages, size: formatBytes(totalBytes) })
              : t('ui.summary', { files: items.length, size: formatBytes(totalBytes) })}
          </span>
          {onClear && (
            <button type="button" className="btn btn-ghost btn-sm" onClick={onClear} disabled={disabled}>
              <Icon name="trash" size={14} />
              {t('ui.clearAll')}
            </button>
          )}
        </div>
      )}
      {onMove && items.length > 1 && <p className="hint file-order-hint">{t('ui.orderHint')}</p>}
      <ul className="file-grid" aria-label={t('ui.fileList')}>
        {items.map((item, i) => (
          <FileTile
            key={item.id}
            item={item}
            index={i}
            total={items.length}
            kind={kind}
            onRemove={onRemove}
            onMove={onMove}
            disabled={disabled}
            dragging={dragFrom === i}
            over={dragOver === i && dragFrom !== i}
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
            onPages={reportPages}
          />
        ))}
      </ul>
    </div>
  );
}
