# رباط — Student Dashboard (Flutter export)

Widget-by-widget port of `ui_kits/student/RibaatFlutterDashboard.dc.html`.
Arabic-only, RTL-first, iPad landscape + wide-web. No hover states — every
interactive surface uses a press (tap-down) response; all touch targets ≥ 44pt.

## Structure

```
lib/
  main.dart                              demo app (locale ar, RTL, light+dark)
  theme/
    ribaat_colors.dart                   ThemeExtension — every color token (light + dark)
    ribaat_typography.dart               Amiri (display) + IBM Plex Sans Arabic (UI)
    ribaat_metrics.dart                  spacing, radii, durations, easing, touch target
    ribaat_theme.dart                    ThemeData factories
  models/
    dashboard_models.dart                Course, TrackStep, StudyTrack, StepStatus
  data/
    sample_dashboard_data.dart           the same demo content as the HTML design
  widgets/
    core/                                Badge, Button, ProgressBar, Avatar,
                                         Pressable, SegmentedControl, DotIndicator
    shell/                               RibaatAppBar, RibaatNavDrawer
    dashboard/                           WelcomeHeader, TrackSection, TrackStepTile,
                                         EnrolledCoursesGrid, CourseCard,
                                         EmptyEnrollments, RecommendedCarousel,
                                         RecommendedCard
  screens/
    student_dashboard_screen.dart        composes the above; breakpoint logic
```

## Fonts

Add to `pubspec.yaml` (files not included here):

```yaml
flutter:
  fonts:
    - family: Amiri
      fonts:
        - asset: assets/fonts/Amiri-Regular.ttf
        - asset: assets/fonts/Amiri-Bold.ttf
          weight: 700
    - family: IBMPlexSansArabic
      fonts:
        - asset: assets/fonts/IBMPlexSansArabic-Regular.ttf
        - asset: assets/fonts/IBMPlexSansArabic-Medium.ttf
          weight: 500
        - asset: assets/fonts/IBMPlexSansArabic-SemiBold.ttf
          weight: 600
        - asset: assets/fonts/IBMPlexSansArabic-Bold.ttf
          weight: 700
  assets:
    - assets/logos/
```

Never apply letterSpacing to Arabic text — the type scale sets it to 0 everywhere.

## Notes on parity with the design

- **Track section sits above دوراتي** and leads with a summary bar (title, level
  badge, progress, next step, one CTA).
- **Multiple أربطة** via `RibaatSegmentedControl` (Cupertino-flavoured, Ribaat skin).
- **Navigation** is a drawer behind the hamburger in `RibaatAppBar`, opening from
  the right (RTL) over a scrim.
- **Recommended carousel** is a `PageView` with `viewportFraction` so the next card
  peeks; a dot indicator shows position. No arrows.
- **Icons**: the HTML used Lucide. In Flutter use `lucide_icons` (or
  `flutter_lucide`) and swap the `IconData` constants in `RibaatIcons`
  (`lib/theme/ribaat_metrics.dart`); Material fallbacks are wired by default.
