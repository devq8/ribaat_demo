/** Neutral shimmer block. Colour comes from .ribaat-skeleton in global.css. */
export function SkeletonBlock({ height = 'var(--space-4)', width = '100%', radius = 'var(--radius-sm)' }) {
  return <div className="ribaat-skeleton" style={{ height, width, borderRadius: radius }} />;
}

/** Card-shaped placeholder matching CourseCard's silhouette. */
export function SkeletonCourseCard() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--surface-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden',
      }}
    >
      <div className="ribaat-skeleton" style={{ aspectRatio: '16 / 9', width: '100%' }} />
      <div style={{ padding: '18px var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        <SkeletonBlock height="var(--space-4)" width="80%" />
        <SkeletonBlock height="var(--space-3)" width="55%" />
        <SkeletonBlock height="var(--space-2)" />
        <SkeletonBlock height="var(--space-10)" radius="var(--radius-md)" />
      </div>
    </div>
  );
}
