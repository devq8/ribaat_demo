import 'package:flutter/material.dart';

import '../data/sample_dashboard_data.dart';
import '../models/dashboard_models.dart';
import '../theme/ribaat_colors.dart';
import '../theme/ribaat_metrics.dart';
import '../widgets/dashboard/enrolled_courses_grid.dart';
import '../widgets/dashboard/recommended_carousel.dart';
import '../widgets/dashboard/track_section.dart';
import '../widgets/dashboard/welcome_header.dart';
import '../widgets/shell/ribaat_app_bar.dart';
import '../widgets/shell/ribaat_nav_drawer.dart';

/// Layout profile derived from window width. Phone is out of scope.
enum RibaatBreakpoint { ipadLandscape, web }

class StudentDashboardScreen extends StatefulWidget {
  const StudentDashboardScreen({
    super.key,
    this.studentName = 'ماجد',
    this.courses = kEnrolledCourses,
    this.recommended = kRecommendedCourses,
    this.tracks = kTracks,
  });

  final String studentName;
  final List<Course> courses;
  final List<RecommendedCourse> recommended;
  final List<StudyTrack> tracks;

  @override
  State<StudentDashboardScreen> createState() => _StudentDashboardScreenState();
}

class _StudentDashboardScreenState extends State<StudentDashboardScreen> {
  bool _drawerOpen = false;
  String _navId = 'dashboard';
  late String _trackId = widget.tracks.first.id;

  String get _statsLine {
    if (widget.courses.isEmpty) return 'لم تبدأ أي دورة بعد';
    final done = widget.courses.where((c) => c.isComplete).length;
    final active = widget.courses.length - done;
    return '$active دورات قيد الدراسة · $done دورة مكتملة · شهادة واحدة صادرة';
  }

  @override
  Widget build(BuildContext context) {
    final c = context.c;

    return Directionality(
      textDirection: TextDirection.rtl,
      child: Scaffold(
        backgroundColor: c.surfacePage,
        body: LayoutBuilder(
          builder: (context, constraints) {
            final bp = constraints.maxWidth >= 1280
                ? RibaatBreakpoint.web
                : RibaatBreakpoint.ipadLandscape;
            final isWeb = bp == RibaatBreakpoint.web;

            return Stack(
              children: [
                Column(
                  children: [
                    RibaatAppBar(
                      studentName: widget.studentName,
                      showDeviceStatus: !isWeb,
                      onMenu: () => setState(() => _drawerOpen = true),
                    ),
                    Expanded(
                      child: SingleChildScrollView(
                        padding: EdgeInsets.fromLTRB(
                          isWeb ? 44 : 30,
                          isWeb ? 34 : 24,
                          isWeb ? 44 : 30,
                          isWeb ? 72 : 56,
                        ),
                        child: Center(
                          child: ConstrainedBox(
                            constraints: BoxConstraints(
                              maxWidth: isWeb ? 1180 : double.infinity,
                            ),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.stretch,
                              children: [
                                WelcomeHeader(
                                  studentName: widget.studentName,
                                  statsLine: _statsLine,
                                ),
                                const SizedBox(height: RibaatMetrics.space6),
                                if (widget.courses.isNotEmpty) ...[
                                  TrackSection(
                                    tracks: widget.tracks,
                                    selectedTrackId: _trackId,
                                    onTrackChanged: (id) => setState(() => _trackId = id),
                                  ),
                                  SizedBox(height: isWeb ? 48 : 40),
                                ],
                                EnrolledCoursesGrid(
                                  courses: widget.courses,
                                  columns: isWeb ? 4 : 3,
                                ),
                                SizedBox(height: isWeb ? 48 : 40),
                                RecommendedCarousel(
                                  courses: widget.recommended,
                                  viewportFraction: isWeb ? 0.26 : 0.31,
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
                RibaatNavDrawer(
                  open: _drawerOpen,
                  activeId: _navId,
                  studentName: widget.studentName,
                  onClose: () => setState(() => _drawerOpen = false),
                  onSelect: (id) => setState(() {
                    _navId = id;
                    _drawerOpen = false;
                  }),
                ),
              ],
            );
          },
        ),
      ),
    );
  }
}
