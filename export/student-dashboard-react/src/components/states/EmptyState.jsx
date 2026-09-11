import { Button } from '../../ds/index.js';

/**
 * Calm, non-promotional empty state. `icon` is a lucide-react component.
 */
export default function EmptyState({ icon: Icon, title, body, actionLabel, onAction, padding = '56px var(--space-6)' }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '14px',
        background: 'var(--surface-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding,
      }}
    >
      {Icon && <Icon style={{ width: 'var(--space-8)', height: 'var(--space-8)', color: 'var(--text-muted)' }} />}
      <p style={{ margin: 0, fontSize: 'var(--text-md)', color: 'var(--text-primary)', fontWeight: 'var(--weight-semibold)' }}>
        {title}
      </p>
      {body && (
        <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--text-muted)', maxWidth: '380px' }}>{body}</p>
      )}
      {actionLabel && (
        <Button variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
