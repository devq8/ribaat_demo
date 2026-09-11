import 'package:flutter/material.dart';

import '../../theme/ribaat_colors.dart';
import '../../theme/ribaat_typography.dart';

class RibaatAvatar extends StatelessWidget {
  const RibaatAvatar({super.key, required this.name, this.size = 34});

  final String name;
  final double size;

  String get _initials {
    final parts = name.trim().split(RegExp(r'\s+')).where((p) => p.isNotEmpty).toList();
    return parts.take(2).map((p) => p.characters.first).join();
  }

  @override
  Widget build(BuildContext context) {
    final c = context.c;
    return Container(
      width: size,
      height: size,
      alignment: Alignment.center,
      decoration: BoxDecoration(color: c.green100, shape: BoxShape.circle),
      child: Text(_initials, style: RibaatType.smSemi(c.textBrand)),
    );
  }
}
