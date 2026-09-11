import DashboardLayout from '../layout/DashboardLayout.jsx';
import DashboardColumns from '../layout/DashboardColumns.jsx';
import { layoutFor } from '../layout/layoutConfig.js';
import { useBreakpoint } from '../hooks/useBreakpoint.js';

import WelcomeHeader from '../components/dashboard/WelcomeHeader.jsx';
import AnnouncementsPanel from '../components/dashboard/AnnouncementsPanel.jsx';
import EnrolledCoursesSection from '../components/dashboard/EnrolledCoursesSection.jsx';
import RecommendedCoursesCarousel from '../components/dashboard/RecommendedCoursesCarousel.jsx';
import PathProgressPanel from '../components/dashboard/PathProgressPanel.jsx';
import { STATUS } from '../components/states/status.js';

import { ar } from '../strings/ar.js';
import { student, recommendedCourses, announcements } from '../data/mockData.js';

/** Secondary screen: same chrome, zero enrollments, calm prompt into the catalogue. */
export default function StudentDashboardEmptyPage({ theme = 'light' }) {
  const layout = layoutFor(useBreakpoint());

  return (
    <DashboardLayout theme={theme} layout={layout} studentName={student.name}>
      <WelcomeHeader
        studentName={student.name}
        statsLine={ar.welcome.statsNoEnrollments}
        titleSize={layout.titleSize}
      />

      <DashboardColumns layout={layout} rail={<PathProgressPanel status={STATUS.empty} />}>
        <AnnouncementsPanel status={STATUS.ready} items={announcements} />
        <EnrolledCoursesSection status={STATUS.empty} hasEnrollments={false} columns={layout.courseColumns} />
        <RecommendedCoursesCarousel status={STATUS.ready} courses={recommendedCourses} cardWidth={layout.carouselCardWidth} />
      </DashboardColumns>
    </DashboardLayout>
  );
}
