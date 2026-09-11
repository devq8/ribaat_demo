import { useMemo } from 'react';
import DashboardLayout from '../layout/DashboardLayout.jsx';
import DashboardColumns from '../layout/DashboardColumns.jsx';
import { layoutFor } from '../layout/layoutConfig.js';
import { useBreakpoint } from '../hooks/useBreakpoint.js';

import WelcomeHeader from '../components/dashboard/WelcomeHeader.jsx';
import AnnouncementsPanel from '../components/dashboard/AnnouncementsPanel.jsx';
import EnrolledCoursesSection from '../components/dashboard/EnrolledCoursesSection.jsx';
import RecommendedCoursesCarousel from '../components/dashboard/RecommendedCoursesCarousel.jsx';
import PathProgressPanel from '../components/dashboard/PathProgressPanel.jsx';
import EventsCalendarPanel from '../components/dashboard/EventsCalendarPanel.jsx';
import { STATUS } from '../components/states/status.js';

import { toCourseCardModel } from '../data/courseModel.js';
import { ar } from '../strings/ar.js';
import {
  student,
  enrolledCourses,
  recommendedCourses,
  announcements,
  pathSteps,
  calendarEvents,
  calendarToday,
  calendarFirstWeekdayOffset,
  calendarDaysInMonth,
} from '../data/mockData.js';

/**
 * Route-level container. Owns data fetching and status, passes plain props to
 * presentational components. Swap the fixture imports for query hooks and set
 * each region's `status` from its own request — the regions already render
 * loading / empty / error without further changes.
 */
export default function StudentDashboardPage({ theme = 'light' }) {
  const breakpoint = useBreakpoint();
  const layout = layoutFor(breakpoint);

  const courses = useMemo(() => enrolledCourses.map(toCourseCardModel), []);
  const inProgress = courses.filter((c) => !c.isCompleted);
  const completed = courses.filter((c) => c.isCompleted);

  const statsLine = courses.length
    ? ar.welcome.statsInProgress(inProgress.length, completed.length)
    : ar.welcome.statsNoEnrollments;

  return (
    <DashboardLayout theme={theme} layout={layout} studentName={student.name}>
      <WelcomeHeader studentName={student.name} statsLine={statsLine} titleSize={layout.titleSize} />

      <DashboardColumns
        layout={layout}
        rail={
          <>
            <PathProgressPanel status={STATUS.ready} steps={pathSteps} />
            <EventsCalendarPanel
              status={STATUS.ready}
              events={calendarEvents}
              daysInMonth={calendarDaysInMonth}
              firstWeekdayOffset={calendarFirstWeekdayOffset}
              today={calendarToday}
              initialDay={8}
            />
          </>
        }
      >
        <AnnouncementsPanel status={STATUS.ready} items={announcements} />

        <EnrolledCoursesSection
          status={STATUS.ready}
          inProgress={inProgress}
          completed={completed}
          hasEnrollments={courses.length > 0}
          columns={layout.courseColumns}
        />

        <RecommendedCoursesCarousel
          status={STATUS.ready}
          courses={recommendedCourses}
          cardWidth={layout.carouselCardWidth}
        />
      </DashboardColumns>
    </DashboardLayout>
  );
}
