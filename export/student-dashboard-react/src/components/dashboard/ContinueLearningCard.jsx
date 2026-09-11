import { Badge, Button, ProgressBar } from '../../ds/index.js';
import CourseThumbnail from './CourseThumbnail.jsx';
import { ar } from '../../strings/ar.js';

/** Enrolled-course card: thumbnail, title (2-line clamp), teacher, progress, CTA. */
export default function ContinueLearningCard({ course, onContinue }) {
  return (
    <article
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
      <CourseThumbnail
        art={course.art}
        title={course.title}
        badge={<Badge tone={course.badgeTone}>{course.badgeLabel}</Badge>}
      />

      <div style={{ padding: '18px var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', flex: 1 }}>
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

        <div style={{ marginTop: 'var(--space-1)' }}>
          <ProgressBar value={course.progress} />
        </div>

        <p style={{ margin: 'var(--space-1) 0 0', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{course.meta}</p>

        <div style={{ marginTop: 'auto', paddingTop: 'var(--space-2)' }}>
          <Button variant={course.ctaVariant} onClick={() => onContinue && onContinue(course)}>
            {course.ctaLabel}
          </Button>
        </div>
      </div>
    </article>
  );
}
