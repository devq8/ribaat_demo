/** Responsive grid wrapper. Column count comes from layoutConfig, never inline. */
export default function CourseGrid({ columns, children }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap: 'var(--space-6)',
        marginTop: 'var(--space-5)',
      }}
    >
      {children}
    </div>
  );
}
