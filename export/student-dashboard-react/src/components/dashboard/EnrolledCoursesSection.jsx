import { useState } from 'react';
import { Award, BookOpen } from 'lucide-react';
import { Button, Tabs } from '../../ds/index.js';
import CourseGrid from './CourseGrid.jsx';
import ContinueLearningCard from './ContinueLearningCard.jsx';
import { SkeletonCourseCard } from '../states/Skeleton.jsx';
import EmptyState from '../states/EmptyState.jsx';
import ErrorState from '../states/ErrorState.jsx';
import { STATUS } from '../states/status.js';
import { COURSE_PAGE_SIZE } from '../../data/courseModel.js';
import { ar } from '../../strings/ar.js';

export const COURSE_TABS = [
  { value: 'in-progress', label: ar.courses.tabInProgress },
  { value: 'completed', label: ar.courses.tabCompleted },
];

/* ---- Labelled state variants ---- */

export function EnrolledCoursesLoading({ columns = 3 }) {
  return (
    <CourseGrid columns={columns}>
      {Array.from({ length: columns }).map((_, i) => (
        <SkeletonCourseCard key={i} />
      ))}
    </CourseGrid>
  );
}

export function EnrolledCoursesError({ onRetry }) {
  return (
    <div style={{ marginTop: 'var(--space-5)' }}>
      <ErrorState
        title={ar.courses.errorTitle}
        body={ar.courses.errorBody}
        retryLabel={ar.courses.retry}
        onRetry={onRetry}
      />
    </div>
  );
}

/** No enrollments at all — prompts into the catalogue. */
export function EnrolledCoursesEmpty({ onBrowse }) {
  return (
    <div style={{ marginTop: 'var(--space-5)' }}>
      <EmptyState
        icon={BookOpen}
        title={ar.courses.emptyEnrollmentsTitle}
        body={ar.courses.emptyEnrollmentsBody}
        actionLabel={ar.courses.emptyEnrollmentsCta}
        onAction={onBrowse}
      />
    </div>
  );
}

/** Enrolled, but nothing currently in progress. */
export function InProgressEmpty() {
  return (
    <div style={{ marginTop: 'var(--space-5)' }}>
      <EmptyState icon={Award} title={ar.courses.emptyInProgressTitle} body={ar.courses.emptyInProgressBody} />
    </div>
  );
}

export function CompletedEmpty() {
  return (
    <div style={{ marginTop: 'var(--space-5)' }}>
      <EmptyState
        icon={Award}
        title={ar.courses.emptyCompletedTitle}
        body={ar.courses.emptyCompletedBody}
        padding="var(--space-12) var(--space-6)"
      />
    </div>
  );
}

/* ---- Region ---- */

export default function EnrolledCoursesSection({
  status = STATUS.ready,
  inProgress = [],
  completed = [],
  hasEnrollments = true,
  columns = 3,
  onContinue,
  onBrowse,
  onRetry,
}) {
  const [activeTab, setActiveTab] = useState('in-progress');
  const [showAllInProgress, setShowAllInProgress] = useState(false);
  const [showAllCompleted, setShowAllCompleted] = useState(false);

  const isInProgress = activeTab === 'in-progress';
  const source = isInProgress ? inProgress : completed;
  const showAll = isInProgress ? showAllInProgress : showAllCompleted;
  const toggleShowAll = isInProgress
    ? () => setShowAllInProgress((v) => !v)
    : () => setShowAllCompleted((v) => !v);

  const visible = showAll ? source : source.slice(0, COURSE_PAGE_SIZE);
  const hasMore = source.length > COURSE_PAGE_SIZE;

  const renderBody = () => {
    if (status === STATUS.loading) return <EnrolledCoursesLoading columns={columns} />;
    if (status === STATUS.error) return <EnrolledCoursesError onRetry={onRetry} />;
    if (!hasEnrollments || status === STATUS.empty) return <EnrolledCoursesEmpty onBrowse={onBrowse} />;
    if (source.length === 0) return isInProgress ? <InProgressEmpty /> : <CompletedEmpty />;

    return (
      <>
        <CourseGrid columns={columns}>
          {visible.map((course) => (
            <ContinueLearningCard key={course.id} course={course} onContinue={onContinue} />
          ))}
        </CourseGrid>
        {hasMore && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--space-5)' }}>
            <Button variant="outline" onClick={toggleShowAll}>
              {showAll ? ar.courses.showLess : ar.courses.showAll(source.length)}
            </Button>
          </div>
        )}
      </>
    );
  };

  return (
    <section>
      <Tabs tabs={COURSE_TABS} active={activeTab} onChange={setActiveTab} />
      {renderBody()}
    </section>
  );
}
