import 'package:flutter/material.dart';

/// Every Ribaat color token, resolved per theme.
/// Mirrors tokens/colors.css and tokens/colors-dark.css one-for-one.
@immutable
class RibaatColors extends ThemeExtension<RibaatColors> {
  const RibaatColors({
    required this.surfacePage,
    required this.surfaceCard,
    required this.surfaceSunken,
    required this.surfaceBrand,
    required this.surfaceBrandStrong,
    required this.surfaceAccent,
    required this.surfaceOverlay,
    required this.borderSubtle,
    required this.borderDefault,
    required this.borderStrong,
    required this.borderBrand,
    required this.textPrimary,
    required this.textSecondary,
    required this.textMuted,
    required this.textOnBrand,
    required this.textBrand,
    required this.textAccent,
    required this.green100,
    required this.green300,
    required this.green600,
    required this.green700,
    required this.brown100,
    required this.successFg,
    required this.successBg,
  });

  final Color surfacePage;
  final Color surfaceCard;
  final Color surfaceSunken;
  final Color surfaceBrand;
  final Color surfaceBrandStrong;
  final Color surfaceAccent;
  final Color surfaceOverlay;
  final Color borderSubtle;
  final Color borderDefault;
  final Color borderStrong;
  final Color borderBrand;
  final Color textPrimary;
  final Color textSecondary;
  final Color textMuted;
  final Color textOnBrand;
  final Color textBrand;
  final Color textAccent;
  final Color green100;
  final Color green300;
  final Color green600;
  final Color green700;
  final Color brown100;
  final Color successFg;
  final Color successBg;

  static const light = RibaatColors(
    surfacePage: Color(0xFFFBF9F3),
    surfaceCard: Color(0xFFFFFEFA),
    surfaceSunken: Color(0xFFEFEADB),
    surfaceBrand: Color(0xFF607247),
    surfaceBrandStrong: Color(0xFF3E4E32),
    surfaceAccent: Color(0xFF8C5F35),
    surfaceOverlay: Color(0x8C211F19),
    borderSubtle: Color(0xFFE2DAC5),
    borderDefault: Color(0xFFC9BFA6),
    borderStrong: Color(0xFF82795F),
    borderBrand: Color(0xFF728759),
    textPrimary: Color(0xFF211F19),
    textSecondary: Color(0xFF635C48),
    textMuted: Color(0xFF82795F),
    textOnBrand: Color(0xFFFFFEFA),
    textBrand: Color(0xFF4F6140),
    textAccent: Color(0xFF79552F),
    green100: Color(0xFFEBEFE4),
    green300: Color(0xFFB2C0A2),
    green600: Color(0xFF607247),
    green700: Color(0xFF4F6140),
    brown100: Color(0xFFF3EBDD),
    successFg: Color(0xFF3E6B4A),
    successBg: Color(0xFFEBEFE4),
  );

  static const dark = RibaatColors(
    surfacePage: Color(0xFF201E18),
    surfaceCard: Color(0xFF2B2820),
    surfaceSunken: Color(0xFF1B1913),
    surfaceBrand: Color(0xFF6B8151),
    surfaceBrandStrong: Color(0xFF55663F),
    surfaceAccent: Color(0xFF96703F),
    surfaceOverlay: Color(0x990A0907),
    borderSubtle: Color(0xFF3A362C),
    borderDefault: Color(0xFF4A4536),
    borderStrong: Color(0xFF6B6551),
    borderBrand: Color(0xFF7C9161),
    textPrimary: Color(0xFFEDE6D6),
    textSecondary: Color(0xFFC4B99F),
    textMuted: Color(0xFF93876C),
    textOnBrand: Color(0xFFF7F3E7),
    textBrand: Color(0xFFA9BE8F),
    textAccent: Color(0xFFD3B583),
    green100: Color(0xFF33402A),
    green300: Color(0xFF55663F),
    green600: Color(0xFF7C9161),
    green700: Color(0xFF94A87A),
    brown100: Color(0xFF3D3020),
    successFg: Color(0xFF8FBB85),
    successBg: Color(0xFF2B3B27),
  );

  @override
  RibaatColors copyWith() => this;

  @override
  RibaatColors lerp(ThemeExtension<RibaatColors>? other, double t) {
    if (other is! RibaatColors) return this;
    return t < 0.5 ? this : other;
  }
}

extension RibaatColorsX on BuildContext {
  RibaatColors get c =>
      Theme.of(this).extension<RibaatColors>() ?? RibaatColors.light;
}
