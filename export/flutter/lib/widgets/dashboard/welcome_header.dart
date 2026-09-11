import 'package:flutter/material.dart';

import '../../theme/ribaat_colors.dart';
import '../../theme/ribaat_typography.dart';

class WelcomeHeader extends StatelessWidget {
  const WelcomeHeader({super.key, required this.studentName, required this.statsLine});

  final String studentName;
  final String statsLine;

  @override
  Widget build(BuildContext context) {
    final c = context.c;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('أهلاً، $studentName', style: RibaatType.h1(c.textPrimary)),
        const SizedBox(height: 6),
        Text(statsLine, style: RibaatType.sm(c.textMuted)),
      ],
    );
  }
}
