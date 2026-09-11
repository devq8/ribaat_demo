import StudentDashboardPage from './pages/StudentDashboardPage.jsx';

/**
 * Swap in a router here. The dashboard page owns only the dashboard route;
 * TopNav/SiteFooter live in layout/DashboardLayout and are shared with
 * the catalogue and learning-paths routes.
 */
export default function App() {
  return <StudentDashboardPage />;
}
