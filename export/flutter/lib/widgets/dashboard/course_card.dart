import 'package:flutter/material.dart';

import '../../models/dashboard_models.dart';
import '../../theme/ribaat_colors.dart';
import '../../theme/ribaat_metrics.dart';
import '../../theme/ribaat_typography.dart';
import '../core/ribaat_badge.dart';
import '../core/ribaat_button.dart';
import '../core/ribaat_pressable.dart';
import '../core/ribaat_progress_bar.dart';

/// Enrolled-course card. The متابعة action stays visible at all times —
/// on touch, tapping the card opens the course, so a reveal-on-tap CTA
/// would compete with that gesture.
class CourseCard extends StatelessWidget {
  const CourseCard({super.key, required this.course, this.onOpen, this.onContinue});

  final Course course;
  final VoidCallback? onOpen;
  final VoidCallback? onContinue;

  @override
  Widget build(BuildContext context) {
    final c = context.c;
    return RibaatPressable(
      onTap: onOpen,
      child: Container(
        decoration: BoxDecoration(
          color: c.surfaceCard,
          border: Border.all(color: c.borderSubtle),
          borderRadius: BorderRadius.circular(RibaatMetrics.radiusLg),
          boxShadow: RibaatMetrics.shadowSm(Colors.black),
        ),
        clipBehavior: Clip.antiAlias,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Course thumbnail slot — replace with the real image.
            AspectRatio(
              aspectRatio: 16 / 9,
              child: Stack(
                children: [
                  Container(
                    color: c.green100,
                    alignment: Alignment.center,
                    child: Icon(RibaatIcons.book, size: 28, color: c.green600),
                  ),
                  PositionedDirectional(
                    top: 10,
                    start: 10,
                    child: RibaatBadge(
                      label: course.isComplete ? 'مكتمل' : 'قيد الدراسة',
                      tone: course.isComplete
                          ? RibaatBadgeTone.success
                          : RibaatBadgeTone.brand,
                    ),
                  ),
                ],
              ),
            ),
            Expanded(
              child: Padding(
                padding: const EdgeInsets.fromLTRB(18, 16, 18, 18),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(course.title, style: RibaatType.md(c.textPrimary)),
                    const SizedBox(height: 6),
                    Text('د. ${course.instructor}', style: RibaatType.sm(c.textSecondary)),
                    const SizedBox(height: RibaatMetrics.space3),
                    RibaatProgressBar(value: course.progress),
                    const SizedBox(height: 6),
                    Text(course.metaLine, style: RibaatType.xs(c.textMuted)),
                    const Spacer(),
                    const SizedBox(height: RibaatMetrics.space3),
                    RibaatButton(
                      label: course.isComplete ? 'مراجعة' : 'متابعة',
                      fullWidth: true,
                      variant: course.isComplete
                          ? RibaatButtonVariant.outline
                          : RibaatButtonVariant.primary,
                      onPressed: onContinue,
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
