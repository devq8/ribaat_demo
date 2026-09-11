import { useRef } from 'react';
import { ChevronRight, ChevronLeft, Compass } from 'lucide-react';
import RecommendedCourseCard from './RecommendedCourseCard.jsx';
import { SkeletonCourseCard } from '../states/Skeleton.jsx';
import EmptyState from '../states/EmptyState.jsx';
import ErrorState from '../states/ErrorState.jsx';
import { STATUS } from '../states/status.js';
import { ar } from '../../strings/ar.js';

const SCROLL_STEP = 320;

const arrowStyle = {
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  border: '1px solid var(--border-default)',
  background: 'var(--surface-card)',
  color: 'var(--text-secondary)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
};

function SectionHead({ children }) {
  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          marginBottom: 'var(--space-1)',
          gap: 'var(--space-3)',
          flexWrap: 'wrap',
        }}
      >
        <h2 style={{ fontSize: 'var(--text-xl)', color: 'var(--text-primary)', fontFamily: 'var(--font-display)', margin: 0 }}>
          {ar.recommended.title}
        </h2>
        {children}
      </div>
      <p style={{ margin: '0 0 var(--space-5)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
        {ar.recommended.subtitle}
      </p>
    </>
  );
}

/* ---- Labelled state variants ---- */

export function RecommendedCarouselLoading({ cardWidth = '280px' }) {
  return (
    <section>
      <SectionHead />
      <div style={{ display: 'flex', gap: 'var(--space-6)', overflow: 'hidden' }} aria-busy="true">
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ flex: `0 0 ${cardWidth}` }}>
            <SkeletonCourseCard />
          </div>
        ))}
      </div>
    </section>
  );
}

export function RecommendedCarouselEmpty() {
  return (
    <section>
      <SectionHead />
      <EmptyState icon={Compass} title={ar.recommended.emptyTitle} body={ar.recommended.emptyBody} padding="var(--space-12) var(--space-6)" />
    </section>
  );
}

export function RecommendedCarouselError({ onRetry }) {
  return (
    <section>
      <SectionHead />
      <ErrorState title={ar.recommended.errorTitle} body={ar.recommended.errorBody} retryLabel={ar.recommended.retry} onRetry={onRetry} />
    </section>
  );
}

/* ---- Region ---- */

export default function RecommendedCoursesCarousel({
  status = STATUS.ready,
  courses = [],
  cardWidth = '280px',
  onEnrol,
  onRetry,
}) {
  const trackRef = useRef(null);

  // RTL: scrollBy takes negative pixels to advance further into the list.
  const scroll = (direction) => {
    const el = trackRef.current;
    if (el) el.scrollBy({ left: direction * -SCROLL_STEP, behavior: 'smooth' });
  };

  if (status === STATUS.loading) return <RecommendedCarouselLoading cardWidth={cardWidth} />;
  if (status === STATUS.error) return <RecommendedCarouselError onRetry={onRetry} />;
  if (status === STATUS.empty || courses.length === 0) return <RecommendedCarouselEmpty />;

  return (
    <section>
      <SectionHead>
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <button aria-label={ar.recommended.prevAria} onClick={() => scroll(-1)} style={arrowStyle}>
            <ChevronRight style={{ width: '18px', height: '18px' }} />
          </button>
          <button aria-label={ar.recommended.nextAria} onClick={() => scroll(1)} style={arrowStyle}>
            <ChevronLeft style={{ width: '18px', height: '18px' }} />
          </button>
        </div>
      </SectionHead>

      <div
        ref={trackRef}
        className="ribaat-carousel-track"
        style={{
          display: 'flex',
          gap: 'var(--space-6)',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          paddingBottom: 'var(--space-1)',
        }}
      >
        {courses.map((course) => (
          <RecommendedCourseCard key={course.id} course={course} width={cardWidth} onEnrol={onEnrol} />
        ))}
      </div>
    </section>
  );
}
