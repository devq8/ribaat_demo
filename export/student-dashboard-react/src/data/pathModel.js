import { ar } from '../strings/ar.js';

/**
 * Visual treatment per step status. Every colour is a design-system custom
 * property; nothing here resolves to a literal hex.
 */
export const PATH_STEP_STYLES = {
  completed: {
    nodeBackground: 'var(--ribaat-green-600)',
    nodeBorder: 'none',
    icon: 'check',
    iconColor: 'var(--text-on-brand)',
    titleColor: 'var(--text-primary)',
    connectorColor: 'var(--ribaat-green-300)',
    caption: ar.path.stepCompleted,
  },
  current: {
    nodeBackground: 'var(--surface-card)',
    nodeBorder: '2px solid var(--ribaat-green-600)',
    icon: 'dot',
    iconColor: 'var(--ribaat-green-600)',
    titleColor: 'var(--text-primary)',
    connectorColor: 'var(--border-default)',
    caption: ar.path.stepCurrent,
  },
  available: {
    nodeBackground: 'var(--surface-card)',
    nodeBorder: '2px solid var(--border-brand)',
    icon: 'play',
    iconColor: 'var(--text-brand)',
    titleColor: 'var(--text-primary)',
    connectorColor: 'var(--border-default)',
    caption: ar.path.stepAvailable,
  },
  locked: {
    nodeBackground: 'var(--surface-sunken)',
    nodeBorder: 'none',
    icon: 'lock',
    iconColor: 'var(--text-muted)',
    titleColor: 'var(--text-muted)',
    connectorColor: 'var(--border-subtle)',
    caption: ar.path.stepLocked,
  },
  'certificate-locked': {
    nodeBackground: 'var(--ribaat-brown-100)',
    nodeBorder: '1px solid var(--border-subtle)',
    icon: 'award',
    iconColor: 'var(--text-accent)',
    titleColor: 'var(--text-secondary)',
    connectorColor: 'transparent',
    caption: ar.path.stepCertificate,
  },
  'certificate-ready': {
    nodeBackground: 'var(--ribaat-brown-600)',
    nodeBorder: 'none',
    icon: 'award',
    iconColor: 'var(--text-on-brand)',
    titleColor: 'var(--text-primary)',
    connectorColor: 'transparent',
    caption: ar.path.stepCertificateReady,
  },
};

export function pathStepStyle(status) {
  return PATH_STEP_STYLES[status] || PATH_STEP_STYLES.locked;
}

/** Certificate rows do not count toward the gated course total. */
export function pathProgress(steps) {
  const gated = steps.filter((s) => !s.status.startsWith('certificate'));
  const completed = gated.filter((s) => s.status === 'completed').length;
  return { completed, total: gated.length, percent: Math.round((completed / gated.length) * 100) };
}
