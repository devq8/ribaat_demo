import { useState } from 'react';
import { Presentation, Shield, Settings, Mail, LogOut } from 'lucide-react';
import { Avatar } from '../ds/index.js';
import { ar } from '../strings/ar.js';

const itemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-2)',
  width: '100%',
  minHeight: 'var(--space-10)',
  padding: '0 var(--space-3)',
  background: 'none',
  border: 'none',
  borderRadius: 'var(--radius-sm)',
  fontFamily: 'var(--font-sans)',
  fontSize: 'var(--text-sm)',
  color: 'var(--text-secondary)',
  cursor: 'pointer',
  textAlign: 'start',
};

const ICON = { width: 'var(--space-4)', height: 'var(--space-4)' };

export default function AccountMenu({ studentName, onSignOut, onNavigate }) {
  const [open, setOpen] = useState(false);
  const go = (key) => () => onNavigate && onNavigate(key);

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={ar.nav.accountAria}
        aria-expanded={open}
        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', borderRadius: '50%', display: 'flex' }}
      >
        <Avatar name={studentName} size="sm" />
      </button>

      {open && (
        <div
          role="menu"
          style={{
            position: 'absolute',
            top: 'calc(100% + var(--space-2))',
            insetInlineEnd: 0,
            minWidth: '200px',
            background: 'var(--surface-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-md)',
            padding: '6px',
            zIndex: 30,
          }}
        >
          <div style={{ padding: 'var(--space-2) var(--space-3)' }}>
            <p style={{ margin: 0, fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-semibold)', color: 'var(--text-primary)' }}>
              {studentName}
            </p>
            <p style={{ margin: 'var(--space-1) 0 0', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
              {ar.accountMenu.roleStudent}
            </p>
          </div>

          <MenuDivider />
          <button role="menuitem" style={itemStyle} onClick={go('teacher')}>
            <Presentation style={ICON} /> <span>{ar.accountMenu.teacherDashboard}</span>
          </button>
          <button role="menuitem" style={itemStyle} onClick={go('admin')}>
            <Shield style={ICON} /> <span>{ar.accountMenu.adminDashboard}</span>
          </button>

          <MenuDivider />
          <button role="menuitem" style={itemStyle} onClick={go('settings')}>
            <Settings style={ICON} /> <span>{ar.accountMenu.settings}</span>
          </button>
          <button role="menuitem" style={itemStyle} onClick={go('contact')}>
            <Mail style={ICON} /> <span>{ar.accountMenu.contact}</span>
          </button>

          <MenuDivider />
          <button
            role="menuitem"
            onClick={onSignOut}
            style={{ ...itemStyle, color: 'var(--state-danger-fg)' }}
          >
            <LogOut style={ICON} /> <span>{ar.accountMenu.signOut}</span>
          </button>
        </div>
      )}
    </div>
  );
}

function MenuDivider() {
  return <div style={{ height: '1px', background: 'var(--border-subtle)', margin: 'var(--space-1) 6px' }} />;
}
