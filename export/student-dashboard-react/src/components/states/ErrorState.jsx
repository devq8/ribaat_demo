import { AlertCircle } from 'lucide-react';
import { Button } from '../../ds/index.js';

/** Muted danger treatment — never a red alarm banner. */
export default function ErrorState({ title, body, retryLabel, onRetry, padding = 'var(--space-10) var(--space-6)' }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 'var(--space-3)',
        background: 'var(--surface-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding,
      }}
    >
      <AlertCircle style={{ width: 'var(--space-7, 28px)', height: 'var(--space-7, 28px)', color: 'var(--state-danger-fg)' }} />
      <p style={{ margin: 0, fontSize: 'var(--text-md)', color: 'var(--text-primary)', fontWeight: 'var(--weight-semibold)' }}>
        {title}
      </p>
      {body && <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--text-muted)', maxWidth: '380px' }}>{body}</p>}
      {retryLabel && (
        <Button variant="outline" onClick={onRetry}>
          {retryLabel}
        </Button>
      )}
    </div>
  );
}
