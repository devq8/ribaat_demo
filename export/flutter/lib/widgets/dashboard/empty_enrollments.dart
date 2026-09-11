import 'package:flutter/material.dart';

import '../../theme/ribaat_colors.dart';
import '../../theme/ribaat_metrics.dart';
import '../../theme/ribaat_typography.dart';
import '../core/ribaat_button.dart';

class EmptyEnrollments extends StatelessWidget {
  const EmptyEnrollments({super.key, this.onBrowse});

  final VoidCallback? onBrowse;

  @override
  Widget build(BuildContext context) {
    final c = context.c;
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: 28, vertical: 64),
      decoration: BoxDecoration(
        color: c.surfaceCard,
        border: Border.all(color: c.borderSubtle),
        borderRadius: BorderRadius.circular(RibaatMetrics.radiusLg),
      ),
      child: Column(
        children: [
          Icon(RibaatIcons.book, size: 34, color: c.textMuted),
          const SizedBox(height: RibaatMetrics.space3),
          Text('لم تسجل في أي دورة بعد', style: RibaatType.md(c.textPrimary)),
          const SizedBox(height: RibaatMetrics.space2),
          SizedBox(
            width: 420,
            child: Text(
              'يمكنك تصفح الدورات المتاحة والبدء بأحد المسارات الدراسية عند رغبتك.',
              textAlign: TextAlign.center,
              style: RibaatType.sm(c.textMuted),
            ),
          ),
          const SizedBox(height: RibaatMetrics.space4),
          RibaatButton(label: 'تصفح الدورات', onPressed: onBrowse),
        ],
      ),
    );
  }
}
