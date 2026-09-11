import { Award } from 'lucide-react';
import { Button } from '../../ds/index.js';
import { ar } from '../../strings/ar.js';

/** Shown inside PathProgressPanel once every gated course in the track is complete. */
export default function PathCertificateCallout({ onClaim }) {
  return (
    <div
      style={{
        margin: 'var(--space-2) 0 var(--space-3)',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--ribaat-brown-100)',
        border: '1px solid var(--ribaat-brown-300)',
        borderRadius: 'var(--radius-lg)',
        padding: '18px var(--space-4) var(--space-4)',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: '46px',
          height: '46px',
          margin: 'var(--space-1) auto var(--space-2)',
          borderRadius: '50%',
          background: 'var(--ribaat-brown-600)',
          boxShadow: '0 0 0 var(--space-1) var(--ribaat-brown-200)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Award style={{ width: 'var(--space-6)', height: 'var(--space-6)', color: 'var(--text-on-brand)' }} strokeWidth={1.8} />
      </div>
      <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 'var(--text-md)', color: 'var(--text-accent)' }}>
        {ar.path.certificateTitle}
      </p>
      <p
        style={{
          margin: '6px 0 var(--space-3)',
          fontSize: 'var(--text-2xs, 11px)',
          color: 'var(--text-secondary)',
          lineHeight: 'var(--leading-normal)',
          textWrap: 'pretty',
        }}
      >
        {ar.path.certificateBody}
      </p>
      <Button variant="primary" onClick={onClaim}>
        {ar.path.certificateCta}
      </Button>
    </div>
  );
}
