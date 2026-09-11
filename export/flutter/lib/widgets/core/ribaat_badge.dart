import 'package:flutter/material.dart';

import '../../theme/ribaat_colors.dart';
import '../../theme/ribaat_typography.dart';

enum RibaatBadgeTone { neutral, brand, accent, success }

class RibaatBadge extends StatelessWidget {
  const RibaatBadge({super.key, required this.label, this.tone = RibaatBadgeTone.neutral});

  final String label;
  final RibaatBadgeTone tone;

  @override
  Widget build(BuildContext context) {
    final c = context.c;
    late Color bg;
    late Color fg;
    switch (tone) {
      case RibaatBadgeTone.brand:
        bg = c.green100;
        fg = c.textBrand;
        break;
      case RibaatBadgeTone.accent:
        bg = c.brown100;
        fg = c.textAccent;
        break;
      case RibaatBadgeTone.success:
        bg = c.successBg;
        fg = c.successFg;
        break;
      case RibaatBadgeTone.neutral:
        bg = c.surfaceSunken;
        fg = c.textSecondary;
        break;
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 3),
      decoration: BoxDecoration(color: bg, borderRadius: BorderRadius.circular(999)),
      child: Text(label, style: RibaatType.xs(fg).copyWith(fontWeight: FontWeight.w600)),
    );
  }
}
