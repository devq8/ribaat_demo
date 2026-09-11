import { ar } from '../../strings/ar.js';

/** Agenda for the selected calendar day, including its own empty variant. */
export default function CalendarDayAgenda({ label, events = [] }) {
  return (
    <div style={{ marginTop: '14px', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-3)' }}>
      <h3 style={{ margin: '0 0 6px', fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-semibold)', color: 'var(--text-primary)' }}>
        {label}
      </h3>

      {events.length === 0 ? (
        <p style={{ margin: 0, fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{ar.calendar.noEvents}</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {events.map((event) => (
            <div key={event.id} style={{ display: 'flex', gap: 'var(--space-2)', padding: 'var(--space-2) 0', borderTop: '1px solid var(--border-subtle)' }}>
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: event.color,
                  flex: 'none',
                  marginTop: '5px',
                }}
              />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-primary)', lineHeight: 'var(--leading-normal)' }}>
                  {event.title}
                </div>
                <div style={{ fontSize: 'var(--text-2xs, 11px)', color: 'var(--text-muted)', marginTop: '2px' }}>{event.meta}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
