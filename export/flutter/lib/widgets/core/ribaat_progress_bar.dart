import 'package:flutter/material.dart';

import '../../theme/ribaat_colors.dart';
import '../../theme/ribaat_metrics.dart';
import '../../theme/ribaat_typography.dart';

class RibaatProgressBar extends StatelessWidget {
  const RibaatProgressBar({super.key, required this.value, this.showValue = true});

  /// 0..100
  final int value;
  final bool showValue;

  @override
  Widget build(BuildContext context) {
    final c = context.c;
    return Row(
      children: [
        Expanded(
          child: ClipRRect(
            borderRadius: BorderRadius.circular(999),
            child: Directionality(
              // Fill grows from the right in RTL.
              textDirection: Directionality.of(context),
              child: TweenAnimationBuilder<double>(
                tween: Tween(begin: 0, end: value / 100),
                duration: RibaatMetrics.normal,
                curve: RibaatMetrics.easeStandard,
                builder: (context, v, _) => LinearProgressIndicator(
                  value: v,
                  minHeight: 8,
                  backgroundColor: c.surfaceSunken,
                  valueColor: AlwaysStoppedAnimation<Color>(c.green600),
                ),
              ),
            ),
          ),
        ),
        if (showValue) ...[
          const SizedBox(width: RibaatMetrics.space2),
          Text('$value%', style: RibaatType.xs(c.textMuted)),
        ],
      ],
    );
  }
}
