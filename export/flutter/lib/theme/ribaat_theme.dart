import 'package:flutter/material.dart';

import 'ribaat_colors.dart';
import 'ribaat_typography.dart';

class RibaatTheme {
  static ThemeData light() => _build(Brightness.light, RibaatColors.light);
  static ThemeData dark() => _build(Brightness.dark, RibaatColors.dark);

  static ThemeData _build(Brightness brightness, RibaatColors c) {
    return ThemeData(
      useMaterial3: true,
      brightness: brightness,
      scaffoldBackgroundColor: c.surfacePage,
      fontFamily: RibaatType.sans,
      splashFactory: NoSplash.splashFactory,
      highlightColor: Colors.transparent,
      hoverColor: Colors.transparent, // touch-first: no hover affordances
      colorScheme: ColorScheme.fromSeed(
        seedColor: c.surfaceBrand,
        brightness: brightness,
        surface: c.surfaceCard,
      ),
      extensions: <ThemeExtension<dynamic>>[c],
    );
  }
}
