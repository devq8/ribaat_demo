import TopNav from './TopNav.jsx';
import SiteFooter from './SiteFooter.jsx';

/**
 * Page chrome shared by every student route: direction, theme attribute,
 * top nav, centred main column, footer. Holds no dashboard content itself.
 */
export default function DashboardLayout({ theme = 'light', layout, studentName, children }) {
  return (
    <div
      dir="rtl"
      data-theme={theme}
      style={{
        background: 'var(--surface-page)',
        minHeight: '100vh',
        fontFamily: 'var(--font-sans)',
        transition: 'background var(--duration-normal) var(--ease-standard)',
      }}
    >
      <TopNav theme={theme} layout={layout} studentName={studentName} />

      <main
        style={{
          maxWidth: layout.containerMaxWidth,
          margin: '0 auto',
          padding: layout.mainPadding,
        }}
      >
        {children}
      </main>

      <SiteFooter theme={theme} layout={layout} />
    </div>
  );
}
