import 'package:flutter/material.dart';

import '../../theme/ribaat_colors.dart';
import '../../theme/ribaat_metrics.dart';

/// Swipe affordance for the recommended PageView — no arrows anywhere.
class PageDotIndicator extends StatelessWidget {
  const PageDotIndicator({super.key, required this.count, required this.index});

  final int count;
  final int index;

  @override
  Widget build(BuildContext context) {
    final c = context.c;
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        for (var i = 0; i < count; i++)
          AnimatedContainer(
            duration: RibaatMetrics.normal,
            curve: RibaatMetrics.easeStandard,
            margin: const EdgeInsets.symmetric(horizontal: 3.5),
            width: i == index ? 20 : 7,
            height: 7,
            decoration: BoxDecoration(
              color: i == index ? c.green600 : c.borderDefault,
              borderRadius: BorderRadius.circular(999),
            ),
          ),
      ],
    );
  }
}
