import { BookOpen } from 'lucide-react';

/**
 * 16:9 course media with an optional overlaid badge slot.
 * Falls back to a calm book glyph when no artwork exists — never stock imagery.
 */
export default function CourseThumbnail({ art, title, badge }) {
  return (
    <div
      style={{
        position: 'relative',
        aspectRatio: '16 / 9',
        background: 'var(--ribaat-green-100)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--ribaat-green-600)',
        flex: 'none',
      }}
    >
      <BookOpen style={{ width: '30px', height: '30px' }} strokeWidth={1.6} />
      {art && (
        <div
          role="img"
          aria-label={title}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${art})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}
      {badge && <div style={{ position: 'absolute', top: 'var(--space-2)', insetInlineStart: 'var(--space-2)' }}>{badge}</div>}
    </div>
  );
}
