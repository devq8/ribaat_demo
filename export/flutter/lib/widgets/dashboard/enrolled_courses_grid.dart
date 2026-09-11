import 'package:flutter/material.dart';

import '../../models/dashboard_models.dart';
import '../../theme/ribaat_colors.dart';
import '../../theme/ribaat_metrics.dart';
import '../../theme/ribaat_typography.dart';
import 'course_card.dart';
import 'empty_enrollments.dart';

/// "دوراتي" — column count follows the breakpoint (3 on iPad landscape,
/// 4 on a wide web window).
class EnrolledCoursesGrid extends StatelessWidget {
  const EnrolledCoursesGrid({
    super.key,
    required this.courses,
    required this.columns,
    this.onOpenCourse,
    this.onBrowse,
  });

  final List<Course> courses;
  final int columns;
  final ValueChanged<Course>? onOpenCourse;
  final VoidCallback? onBrowse;

  @override
  Widget build(BuildContext context) {
    final c = context.c;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('دوراتي', style: RibaatType.h2(c.textPrimary)),
        const SizedBox(height: RibaatMetrics.space4),
        if (courses.isEmpty)
          EmptyEnrollments(onBrowse: onBrowse)
        else
          GridView.builder(
            shrinkWrap: true,
            padding: EdgeInsets.zero,
            physics: const NeverScrollableScrollPhysics(),
            itemCount: courses.length,
            gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: columns,
              mainAxisSpacing: 18,
              crossAxisSpacing: 18,
              mainAxisExtent: 340,
            ),
            itemBuilder: (context, i) => CourseCard(
              course: courses[i],
              onOpen: () => onOpenCourse?.call(courses[i]),
              onContinue: () => onOpenCourse?.call(courses[i]),
            ),
          ),
      ],
    );
  }
}
