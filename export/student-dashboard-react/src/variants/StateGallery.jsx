import AnnouncementsPanel, {
  AnnouncementsPanelLoading,
  AnnouncementsPanelEmpty,
  AnnouncementsPanelError,
} from '../components/dashboard/AnnouncementsPanel.jsx';
import EnrolledCoursesSection, {
  EnrolledCoursesLoading,
  EnrolledCoursesEmpty,
  EnrolledCoursesError,
  InProgressEmpty,
  CompletedEmpty,
} from '../components/dashboard/EnrolledCoursesSection.jsx';
import RecommendedCoursesCarousel, {
  RecommendedCarouselLoading,
  RecommendedCarouselEmpty,
  RecommendedCarouselError,
} from '../components/dashboard/RecommendedCoursesCarousel.jsx';
import PathProgressPanel, {
  PathProgressLoading,
  PathProgressEmpty,
  PathProgressError,
} from '../components/dashboard/PathProgressPanel.jsx';
import EventsCalendarPanel, {
  EventsCalendarLoading,
  EventsCalendarEmpty,
  EventsCalendarError,
} from '../components/dashboard/EventsCalendarPanel.jsx';

import { toCourseCardModel } from '../data/courseModel.js';
import { announcements, enrolledCourses, recommendedCourses, pathSteps, calendarEvents } from '../data/mockData.js';

const courses = enrolledCourses.map(toCourseCardModel);

/**
 * Every data-driven region × every state, labelled.
 * Mount at /variants during development, or lift each entry into a story file.
 */
export const VARIANTS = [
  { id: 'announcements/ready', label: 'Announcements — ready', render: () => <AnnouncementsPanel items={announcements} /> },
  { id: 'announcements/loading', label: 'Announcements — loading', render: () => <AnnouncementsPanelLoading /> },
  { id: 'announcements/empty', label: 'Announcements — empty', render: () => <AnnouncementsPanelEmpty /> },
  { id: 'announcements/error', label: 'Announcements — error', render: () => <AnnouncementsPanelError /> },

  { id: 'courses/ready', label: 'Enrolled courses — ready', render: () => (
      <EnrolledCoursesSection inProgress={courses.filter((c) => !c.isCompleted)} completed={courses.filter((c) => c.isCompleted)} columns={3} />
    ) },
  { id: 'courses/loading', label: 'Enrolled courses — loading', render: () => <EnrolledCoursesLoading columns={3} /> },
  { id: 'courses/empty-enrollments', label: 'Enrolled courses — empty (no enrollments)', render: () => <EnrolledCoursesEmpty /> },
  { id: 'courses/empty-in-progress', label: 'Enrolled courses — empty (none in progress)', render: () => <InProgressEmpty /> },
  { id: 'courses/empty-completed', label: 'Enrolled courses — empty (none completed)', render: () => <CompletedEmpty /> },
  { id: 'courses/error', label: 'Enrolled courses — error', render: () => <EnrolledCoursesError /> },

  { id: 'recommended/ready', label: 'Recommended carousel — ready', render: () => <RecommendedCoursesCarousel courses={recommendedCourses} /> },
  { id: 'recommended/loading', label: 'Recommended carousel — loading', render: () => <RecommendedCarouselLoading /> },
  { id: 'recommended/empty', label: 'Recommended carousel — empty', render: () => <RecommendedCarouselEmpty /> },
  { id: 'recommended/error', label: 'Recommended carousel — error', render: () => <RecommendedCarouselError /> },

  { id: 'path/ready', label: 'Path progress — ready', render: () => <PathProgressPanel steps={pathSteps} /> },
  { id: 'path/complete', label: 'Path progress — ready (certificate available)', render: () => (
      <PathProgressPanel steps={pathSteps.map((s) => ({ ...s, status: s.status.startsWith('certificate') ? 'certificate-ready' : 'completed' }))} isComplete />
    ) },
  { id: 'path/loading', label: 'Path progress — loading', render: () => <PathProgressLoading /> },
  { id: 'path/empty', label: 'Path progress — empty', render: () => <PathProgressEmpty /> },
  { id: 'path/error', label: 'Path progress — error', render: () => <PathProgressError /> },

  { id: 'calendar/ready', label: 'Events calendar — ready', render: () => <EventsCalendarPanel events={calendarEvents} initialDay={8} /> },
  { id: 'calendar/loading', label: 'Events calendar — loading', render: () => <EventsCalendarLoading /> },
  { id: 'calendar/empty', label: 'Events calendar — empty', render: () => <EventsCalendarEmpty /> },
  { id: 'calendar/error', label: 'Events calendar — error', render: () => <EventsCalendarError /> },
];

export default function StateGallery({ theme = 'light' }) {
  return (
    <div dir="rtl" data-theme={theme} style={{ background: 'var(--surface-page)', minHeight: '100vh', padding: 'var(--space-8)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-10)', maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        {VARIANTS.map((variant) => (
          <section key={variant.id}>
            <p
              style={{
                margin: '0 0 var(--space-3)',
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-xs)',
                color: 'var(--text-muted)',
                direction: 'ltr',
                textAlign: 'start',
              }}
            >
              {variant.label}
            </p>
            {variant.render()}
          </section>
        ))}
      </div>
    </div>
  );
}
