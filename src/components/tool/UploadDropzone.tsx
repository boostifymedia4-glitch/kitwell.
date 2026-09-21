import { useId, useRef, useState, type DragEvent } from 'react';
import { formatBytes } from '@/lib/format';
import { Icon } from '../Icon';

interface Props {
  /** Extensions without the dot, e.g. ['jpg', 'png']. */
  extensions: string[];
  multiple?: boolean;
  maxBytes: number;
  maxFiles?: number;
  onFiles: (files: File[]) => void;
  disabled?: boolean;
  title?: string;
  compact?: boolean;
}

export function UploadDropzone({ extensions, multiple = false, maxBytes, maxFiles, onFiles, disabled, title, compact }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const hintId = useId();
  const label = title ?? (multiple ? 'Drop files here or click to choose' : 'Drop a file here or click to choose');

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (disabled) return;
    const files = Array.from(e.dataTransfer.files);
    if (files.length) onFiles(files);
  };

  return (
    <div>
      <button
        type="button"
        className="dropzone"
        data-active={dragging}
        disabled={disabled}
        aria-describedby={hintId}
        style={compact ? { padding: 'var(--space-5) var(--space-4)' } : undefined}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        <Icon name="upload" size={compact ? 26 : 34} className="dz-icon" />
        <strong>{label}</strong>
        <span className="hint" id={hintId}>
          {extensions.map((e) => e.toUpperCase()).join(', ')} · up to {formatBytes(maxBytes)} each
          {multiple && maxFiles ? ` · max ${maxFiles} files` : ''}
        </span>
      </button>
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
