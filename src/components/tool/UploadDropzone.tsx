import { useId, useRef, useState, type DragEvent } from 'react';
import { useI18n } from '@/i18n';
import { formatBytes } from '@/lib/format';
import { Icon } from '../Icon';
import { CloudPick } from './CloudButtons';

interface Props {
  /** Extensions without the dot, e.g. ['jpg', 'png']. */
  extensions: string[];
  multiple?: boolean;
  maxBytes: number;
  maxFiles?: number;
  onFiles: (files: File[]) => void;
  disabled?: boolean;
  title?: string;
  /** A smaller bar for adding more files once some are already selected. */
  compact?: boolean;
}

/**
 * Where files are added: a drop area with a clear "Choose files" button and, when they are set up, buttons to pick files
 * from Google Drive and Dropbox. Once files are selected the area shrinks to an "Add more files" bar.
 */
export function UploadDropzone({ extensions, multiple = false, maxBytes, maxFiles, onFiles, disabled, title, compact }: Props) {
  const { t } = useI18n();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const hintId = useId();
  const label = title ?? (multiple ? t('ui.dropzone.files') : t('ui.dropzone.file'));
  const choose = compact ? t('ui.addMoreFiles') : multiple ? t('ui.chooseFiles') : t('ui.chooseFile');

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (disabled) return;
    const files = Array.from(e.dataTransfer.files);
    if (files.length) onFiles(files);
  };

  return (
    <div className={compact ? 'upload upload-compact' : 'upload'}>
      <div
        className="dropzone"
        role="group"
        aria-label={label}
        aria-describedby={hintId}
        data-active={dragging}
        data-disabled={disabled || undefined}
        onClick={(e) => {
          if (!disabled && !(e.target as HTMLElement).closest('.dz-actions')) inputRef.current?.click();
        }}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        <Icon name="upload" size={compact ? 24 : 36} className="dz-icon" />
        <strong className="dz-title">{label}</strong>
        <div className="dz-actions">
          <button type="button" className="btn btn-primary btn-lg dz-choose" disabled={disabled} onClick={() => inputRef.current?.click()}>
            <Icon name={compact ? 'plus' : 'upload'} size={18} />
            {choose}
          </button>
          <CloudPick extensions={extensions} multiple={multiple} onFiles={onFiles} disabled={disabled} />
        </div>
        <span className="hint dz-hint" id={hintId}>
          {multiple && maxFiles
            ? t('ui.dropzone.hintMax', { types: extensions.map((e) => e.toUpperCase()).join(', '), size: formatBytes(maxBytes), max: maxFiles })
            : t('ui.dropzone.hint', { types: extensions.map((e) => e.toUpperCase()).join(', '), size: formatBytes(maxBytes) })}
        </span>
      </div>
      <input
        ref={inputRef}
        type="file"
        hidden
        tabIndex={-1}
        multiple={multiple}
        accept={extensions.map((e) => `.${e}`).join(',')}
        onChange={(e) => {
          const files = Array.from(e.target.files ?? []);
          e.target.value = ''; // allow choosing the same file again
          if (files.length) onFiles(files);
        }}
      />
    </div>
  );
}
