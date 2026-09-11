import { CALENDAR_EVENT_TYPES } from '../../data/calendarModel.js';

export default function CalendarLegend() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px var(--space-3)', marginTop: 'var(--space-3)' }}>
      {Object.entries(CALENDAR_EVENT_TYPES).map(([key, type]) => (
        <span
          key={key}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: 'var(--text-3xs, 10px)', color: 'var(--text-muted)' }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: type.color }} />
          {type.label}
        </span>
      ))}
    </div>
  );
}
