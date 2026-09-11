import { ar } from '../../strings/ar.js';

const cellText = { fontSize: 'var(--text-3xs, 9px)', color: 'var(--text-muted)', textAlign: 'center', overflow: 'hidden' };
const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(7, minmax(0, 1fr))', gap: '3px' };

/** Month matrix with per-day event dots. Selection state is owned by the parent. */
export default function CalendarMonthGrid({ cells, onSelectDay }) {
  return (
    <>
      <div style={{ ...gridStyle, marginBottom: '3px' }}>
        {ar.calendar.weekdaysShort.map((label) => (
          <div key={label} style={cellText}>
            {label}
          </div>
        ))}
      </div>

      <div style={gridStyle}>
        {cells.map((cell) => (
          <div
            key={cell.key}
            onClick={() => cell.day && onSelectDay(cell.day)}
            style={{
              minHeight: '30px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px',
              padding: '3px 0 var(--space-1)',
              borderRadius: 'var(--radius-sm)',
              cursor: cell.day ? 'pointer' : 'default',
              overflow: 'hidden',
              visibility: cell.day ? 'visible' : 'hidden',
              background: cell.isSelected ? 'var(--ribaat-green-100)' : 'transparent',
              border: cell.isSelected
                ? '1px solid var(--ribaat-green-600)'
                : cell.isToday
                ? '1px dashed var(--border-default)'
                : '1px solid transparent',
            }}
          >
            <div
              style={{
                fontSize: 'var(--text-2xs, 11px)',
                fontWeight: 'var(--weight-semibold)',
                color: cell.isSelected ? 'var(--text-brand)' : 'var(--text-primary)',
                lineHeight: 'var(--leading-tight)',
              }}
            >
              {cell.day}
            </div>
            <div style={{ display: 'flex', gap: '2px' }}>
              {cell.dots.map((dot) => (
                <span
                  key={dot.id}
                  style={{ width: 'var(--space-1)', height: 'var(--space-1)', borderRadius: '50%', background: dot.color, flex: 'none' }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
