import { Megaphone } from 'lucide-react';
import AnnouncementRow from './AnnouncementRow.jsx';
import { SkeletonBlock } from '../states/Skeleton.jsx';
import ErrorState from '../states/ErrorState.jsx';
import { STATUS } from '../states/status.js';
import { ar } from '../../strings/ar.js';

const shell = {
  background: 'var(--state-warning-bg)',
  border: '1px solid color-mix(in oklab, var(--state-warning-fg) 40%, transparent)',
  borderRadius: 'var(--radius-lg)',
  padding: '18px var(--space-5)',
};

function PanelShell({ children }) {
  return (
    <div style={shell}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: '14px' }}>
        <Megaphone style={{ width: '18px', height: '18px', color: 'var(--state-warning-fg)' }} />
        <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-semibold)', color: 'var(--state-warning-fg)' }}>
          {ar.announcements.title}
        </span>
      </div>
      {children}
    </div>
  );
}

/* ---- Labelled state variants (exported for the state gallery) ---- */

export function AnnouncementsPanelLoading() {
  return (
    <PanelShell>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }} aria-label={ar.states.loadingAria} aria-busy="true">
        <SkeletonBlock height="var(--space-3)" width="70%" />
        <SkeletonBlock height="var(--space-3)" width="85%" />
      </div>
    </PanelShell>
  );
}

export function AnnouncementsPanelEmpty() {
  return (
    <PanelShell>
      <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>{ar.announcements.empty}</p>
    </PanelShell>
  );
}

export function AnnouncementsPanelError({ onRetry }) {
  return (
    <ErrorState
      title={ar.announcements.errorTitle}
      body={ar.announcements.errorBody}
      retryLabel={ar.announcements.retry}
      onRetry={onRetry}
      padding="var(--space-6)"
    />
  );
}

/* ---- Region ---- */

export default function AnnouncementsPanel({ status = STATUS.ready, items = [], onRetry }) {
  if (status === STATUS.loading) return <AnnouncementsPanelLoading />;
  if (status === STATUS.error) return <AnnouncementsPanelError onRetry={onRetry} />;
  if (status === STATUS.empty || items.length === 0) return <AnnouncementsPanelEmpty />;

  return (
    <PanelShell>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {items.map((item) => (
          <AnnouncementRow key={item.id} day={item.day} date={item.date} text={item.text} />
        ))}
      </div>
    </PanelShell>
  );
}
