import { useEffect, useRef, useState } from 'react';
import { copyText } from '@/lib/download';
import { Icon } from '../Icon';

export function CopyButton({ text, label = 'Copy', variant = 'secondary', size = 'sm', disabled }: { text: string; label?: string; variant?: 'primary' | 'secondary' | 'ghost'; size?: 'sm' | 'md'; disabled?: boolean }) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const timer = useRef<number>(0);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const onClick = async () => {
    const ok = await copyText(text);
    setState(ok ? 'copied' : 'failed');
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState('idle'), 1800);
  };

  return (
    <button type="button" className={`btn btn-${variant} ${size === 'sm' ? 'btn-sm' : ''}`} onClick={onClick} disabled={disabled || !text}>
      <Icon name={state === 'copied' ? 'check' : 'copy'} size={14} />
      <span aria-live="polite">{state === 'copied' ? 'Copied' : state === 'failed' ? 'Copy failed' : label}</span>
    </button>
  );
}

/** Read-only value with a copy button. */
export function CopyRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="field">
      <span className="label">{label}</span>
      <div className="copy-row">
        <input className="input" readOnly value={value} aria-label={label} onFocus={(e) => e.currentTarget.select()} />
        <CopyButton text={value} />
      </div>
    </div>
  );
}
