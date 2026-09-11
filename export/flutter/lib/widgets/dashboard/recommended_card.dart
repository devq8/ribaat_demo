import 'package:flutter/material.dart';

import '../../models/dashboard_models.dart';
import '../../theme/ribaat_colors.dart';
import '../../theme/ribaat_metrics.dart';
import '../../theme/ribaat_typography.dart';
import '../core/ribaat_badge.dart';
import '../core/ribaat_button.dart';
import '../core/ribaat_pressable.dart';

class RecommendedCard extends StatelessWidget {
  const RecommendedCard({super.key, required this.course, this.onEnrol, this.onOpen});

  final RecommendedCourse course;
  final VoidCallback? onEnrol;
  final VoidCallback? onOpen;

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
            AspectRatio(
              aspectRatio: 16 / 9,
              child: Stack(
                children: [
                  Container(
                    color: c.brown100,
                    alignment: Alignment.center,
                    child: Icon(RibaatIcons.book, size: 28, color: c.textAccent),
                  ),
                  PositionedDirectional(
                    top: 10,
                    start: 10,
                    child: RibaatBadge(label: course.category, tone: RibaatBadgeTone.accent),
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
                    const SizedBox(height: 6),
                    Text(course.metaLine, style: RibaatType.xs(c.textMuted)),
                    if (course.hint != null) ...[
                      const SizedBox(height: 4),
                      Text(course.hint!, style: RibaatType.xs(c.textMuted)),
                    ],
                    const Spacer(),
                    const SizedBox(height: RibaatMetrics.space3),
                    RibaatButton(label: 'سجل الآن', fullWidth: true, onPressed: onEnrol),
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
