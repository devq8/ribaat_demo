import { ar } from '../strings/ar.js';
import AccountMenu from './AccountMenu.jsx';

const LINKS = [
  { key: 'dashboard', href: '/dashboard', label: ar.nav.dashboard, active: true },
  { key: 'catalogue', href: '/courses', label: ar.nav.catalogue, active: false },
  { key: 'paths', href: '/paths', label: ar.nav.paths, active: false },
];

export default function TopNav({ theme, layout, studentName }) {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: layout.headerPadding,
        background: 'var(--surface-card)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
        <img
          src="/assets/logos/ribaat-wordmark.png"
          alt={ar.nav.brandAlt}
          style={{
            height: '30px',
            filter: theme === 'dark' ? 'brightness(0) invert(1) opacity(0.9)' : 'none',
          }}
        />
        <nav style={{ display: 'flex', gap: '26px' }}>
          {LINKS.map((link) => (
            <a
              key={link.key}
              href={link.href}
              style={{
                fontSize: 'var(--text-base)',
                color: link.active ? 'var(--text-brand)' : 'var(--text-secondary)',
                fontWeight: link.active ? 'var(--weight-semibold)' : 'var(--weight-regular)',
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <AccountMenu studentName={studentName} />
    </header>
  );
}
