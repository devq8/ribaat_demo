import { ar } from '../strings/ar.js';

const linkStyle = { fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' };
const headingStyle = {
  fontSize: 'var(--text-sm)',
  fontWeight: 'var(--weight-semibold)',
  color: 'var(--text-primary)',
};

export default function SiteFooter({ theme, layout }) {
  return (
    <footer
      style={{
        background: 'var(--surface-card)',
        borderTop: '1px solid var(--border-subtle)',
        marginTop: 'var(--space-6)',
      }}
    >
      <div
        style={{
          maxWidth: layout.containerMaxWidth,
          margin: '0 auto',
          padding: 'var(--space-8) clamp(var(--space-6), 6vw, 120px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 'var(--space-8)',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', maxWidth: '320px' }}>
          <img
            src="/assets/logos/ribaat-wordmark.png"
            alt={ar.nav.brandAlt}
            style={{
              height: '26px',
              alignSelf: 'flex-start',
              filter: theme === 'dark' ? 'brightness(0) invert(1) opacity(0.9)' : 'none',
            }}
          />
          <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 'var(--leading-relaxed)' }}>
            {ar.footer.about}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '56px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <span style={headingStyle}>{ar.footer.linksHeading}</span>
            <a href="/dashboard" style={linkStyle}>{ar.nav.dashboard}</a>
            <a href="/courses" style={linkStyle}>{ar.nav.catalogue}</a>
            <a href="/paths" style={linkStyle}>{ar.nav.paths}</a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <span style={headingStyle}>{ar.footer.certificatesHeading}</span>
            <a href="/certificates" style={linkStyle}>{ar.footer.verifyCertificate}</a>
            <a href="/contact" style={linkStyle}>{ar.footer.contact}</a>
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--border-subtle)' }}>
        <div
          style={{
            maxWidth: layout.containerMaxWidth,
            margin: '0 auto',
            padding: '14px clamp(var(--space-6), 6vw, 120px)',
          }}
        >
          <p style={{ margin: 0, fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{ar.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
