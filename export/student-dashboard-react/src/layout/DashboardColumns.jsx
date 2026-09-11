/**
 * The dashboard's two-column frame: primary content column (RTL start) and the
 * passive rail (physical left). Collapses to a single stacked column on mobile.
 */
export default function DashboardColumns({ layout, children, rail }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: layout.columnGap,
        alignItems: layout.stacked ? 'stretch' : 'flex-start',
        flexDirection: layout.stacked ? 'column' : 'row',
      }}
    >
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: layout.sectionGap }}>
        {children}
      </div>

      <aside
        style={{
          width: layout.railWidth,
          flex: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-4)',
        }}
      >
        {rail}
      </aside>
    </div>
  );
}
