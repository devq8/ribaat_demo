import { Badge, Button } from '../../ds/index.js';
import CourseThumbnail from './CourseThumbnail.jsx';
import { ar } from '../../strings/ar.js';

/** Carousel card: category chip, title (2-line clamp), teacher, meta, enrol CTA. */
export default function RecommendedCourseCard({ course, width, onEnrol }) {
  return (
    <article
      style={{
        flex: `0 0 ${width}`,
        scrollSnapAlign: 'start',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--surface-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden',
      }}
    >
      <CourseThumbnail art={course.art} title={course.title} badge={<Badge tone="accent">{course.category}</Badge>} />

      <div style={{ padding: 'var(--space-4) 18px', display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
        <span
          style={{
            fontWeight: 'var(--weight-semibold)',
            fontSize: 'var(--text-md)',
            color: 'var(--text-primary)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            minHeight: 'calc(var(--text-md) * 2.6)',
          }}
        >
          {course.title}
        </span>

        <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
          {ar.honorifics.doctor} {course.instructor}
        </p>
        <p style={{ margin: 'var(--space-1) 0 0', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{course.meta}</p>
        {course.hint && (
          <p style={{ margin: 'var(--space-1) 0 0', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{course.hint}</p>
        )}

        <div style={{ marginTop: 'auto', paddingTop: 'var(--space-3)' }}>
          <Button variant="primary" onClick={() => onEnrol && onEnrol(course)}>
            {ar.recommended.enrol}
          </Button>
        </div>
      </div>
    </article>
  );
}
