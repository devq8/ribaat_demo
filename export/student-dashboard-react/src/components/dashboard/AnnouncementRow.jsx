/** One announcement: day + date on a fixed-width column, text on the same line. */
export default function AnnouncementRow({ day, date, text }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-2)' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', flex: 'none', width: '108px' }}>
        <span
          style={{
            fontSize: 'var(--text-xs)',
            fontWeight: 'var(--weight-semibold)',
            color: 'var(--state-warning-fg)',
            whiteSpace: 'nowrap',
          }}
        >
          {day}
        </span>
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--state-warning-fg)', whiteSpace: 'nowrap', direction: 'rtl' }}>
          {date}
        </span>
      </div>
      <p
        style={{
          margin: 0,
          fontSize: 'var(--text-sm)',
          color: 'var(--text-primary)',
          lineHeight: 'var(--leading-normal)',
          flex: 1,
          minWidth: 0,
          textWrap: 'pretty',
        }}
      >
        {text}
      </p>
    </div>
  );
}
