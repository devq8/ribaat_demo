import { Check, Play, Lock, Award } from 'lucide-react';
import { pathStepStyle } from '../../data/pathModel.js';

const NODE = { width: '22px', height: '22px' };
const GLYPH = { width: '12px', height: '12px' };

function StepGlyph({ icon, color }) {
  if (icon === 'check') return <Check style={{ ...GLYPH, color }} strokeWidth={3} />;
  if (icon === 'play') return <Play style={{ width: '11px', height: '11px', color }} fill="currentColor" strokeWidth={0} />;
  if (icon === 'lock') return <Lock style={{ width: '11px', height: '11px', color }} strokeWidth={2.2} />;
  if (icon === 'award') return <Award style={{ ...GLYPH, color }} strokeWidth={2} />;
  return <span style={{ width: 'var(--space-2)', height: 'var(--space-2)', borderRadius: '50%', background: color }} />;
}

/**
 * One node in the vertical path stepper.
 * Status is communicated by glyph + caption text, never by colour alone.
 */
export default function PathStep({ title, status, hasConnector }) {
  const s = pathStepStyle(status);
  return (
    <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 'none' }}>
        <div
          style={{
            ...NODE,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 'none',
            background: s.nodeBackground,
            border: s.nodeBorder,
          }}
        >
          <StepGlyph icon={s.icon} color={s.iconColor} />
        </div>
        {hasConnector && <div style={{ width: '2px', flex: 1, minHeight: '18px', background: s.connectorColor }} />}
      </div>

      <div style={{ flex: 1, paddingBottom: '14px', minWidth: 0 }}>
        <span
          style={{
            display: 'block',
            fontSize: 'var(--text-xs)',
            fontWeight: 'var(--weight-semibold)',
            color: s.titleColor,
            lineHeight: 'var(--leading-tight)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {title}
        </span>
        <p style={{ margin: '1px 0 0', fontSize: 'var(--text-2xs, 11px)', color: 'var(--text-muted)' }}>{s.caption}</p>
      </div>
    </div>
  );
}
