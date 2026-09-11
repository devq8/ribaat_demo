import { Route } from 'lucide-react';
import { ProgressBar } from '../../ds/index.js';
import PathStep from './PathStep.jsx';
import PathCertificateCallout from './PathCertificateCallout.jsx';
import { SkeletonBlock } from '../states/Skeleton.jsx';
import EmptyState from '../states/EmptyState.jsx';
import ErrorState from '../states/ErrorState.jsx';
import { STATUS } from '../states/status.js';
import { pathProgress } from '../../data/pathModel.js';
import { ar } from '../../strings/ar.js';

const panel = {
  background: 'var(--surface-card)',
  border: '1px solid var(--border-subtle)',
  borderRadius: 'var(--radius-lg)',
  padding: '22px var(--space-5)',
};

function PanelHead({ trackLabel }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '2px' }}>
      <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 'var(--text-md)', color: 'var(--text-primary)' }}>
        {ar.path.title}
      </h2>
      {trackLabel && <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{trackLabel}</span>}
    </div>
  );
}

/* ---- Labelled state variants ---- */

export function PathProgressLoading() {
  return (
    <div style={panel} aria-busy="true">
      <PanelHead />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
        <SkeletonBlock height="var(--space-2)" />
        {[0, 1, 2, 3, 4].map((i) => (
          <SkeletonBlock key={i} height="var(--space-4)" width={i % 2 ? '75%' : '90%'} />
        ))}
      </div>
    </div>
  );
}

export function PathProgressEmpty({ onExplore }) {
  return (
    <EmptyState
      icon={Route}
      title={ar.path.emptyTitle}
      body={ar.path.emptyBody}
      actionLabel={ar.nav.paths}
      onAction={onExplore}
      padding="var(--space-10) var(--space-5)"
    />
  );
}

export function PathProgressError({ onRetry }) {
  return (
    <ErrorState
      title={ar.path.errorTitle}
      body={ar.path.errorBody}
      retryLabel={ar.path.retry}
      onRetry={onRetry}
      padding="var(--space-8) var(--space-5)"
    />
  );
}

/* ---- Region ---- */

/**
 * Passive snapshot of the student's track: overall progress plus a compact
 * vertical stepper. Deliberately carries no per-step CTAs — the full,
 * interactive stepper lives on the المسارات page.
 */
export default function PathProgressPanel({
  status = STATUS.ready,
  steps = [],
  trackLabel = ar.path.levelOne,
  isComplete = false,
  detailsHref = '/paths',
  onClaimCertificate,
  onExplore,
  onRetry,
}) {
  if (status === STATUS.loading) return <PathProgressLoading />;
  if (status === STATUS.error) return <PathProgressError onRetry={onRetry} />;
  if (status === STATUS.empty || steps.length === 0) return <PathProgressEmpty onExplore={onExplore} />;

  const { completed, total, percent } = pathProgress(steps);

  return (
    <div style={panel}>
      <PanelHead trackLabel={trackLabel} />
      <p style={{ margin: 'var(--space-1) 0 var(--space-3)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
        {ar.path.progressSummary(isComplete ? total : completed, total)}
      </p>
      <ProgressBar value={isComplete ? 100 : percent} />

      <div style={{ display: 'flex', flexDirection: 'column', marginTop: 'var(--space-5)' }}>
        {steps.map((step, i) => (
          <PathStep key={step.id} title={step.title} status={step.status} hasConnector={i < steps.length - 1} />
        ))}
      </div>

      {isComplete && <PathCertificateCallout onClaim={onClaimCertificate} />}

      <a
        href={detailsHref}
        style={{
          display: 'block',
          marginTop: '2px',
          fontSize: 'var(--text-xs)',
          fontWeight: 'var(--weight-semibold)',
          color: 'var(--text-brand)',
        }}
      >
        {ar.path.details}
      </a>
    </div>
  );
}
