import 'package:flutter/material.dart';

/// Ribaat design tokens — colors, type, spacing, radii.
/// Ported from the Ribaat Design System (colors.css / colors-dark.css /
/// typography.css / effects.css). Keep in sync with the HTML source of truth.
class RibaatColors {
  final Color surfacePage;
  final Color surfaceCard;
  final Color surfaceSunken;
  final Color surfaceBrandStrong;
  final Color borderSubtle;
  final Color borderDefault;
  final Color textPrimary;
  final Color textSecondary;
  final Color textMuted;
  final Color textLink;
  final Color dangerFg;
  final Color dangerBg;
  final Color brandGreen600;
  final Color brandGreen700;
  final Color textOnBrand;

  const RibaatColors({
    required this.surfacePage,
    required this.surfaceCard,
    required this.surfaceSunken,
    required this.surfaceBrandStrong,
    required this.borderSubtle,
    required this.borderDefault,
    required this.textPrimary,
    required this.textSecondary,
    required this.textMuted,
    required this.textLink,
    required this.dangerFg,
    required this.dangerBg,
    required this.brandGreen600,
    required this.brandGreen700,
    required this.textOnBrand,
  });

  static const light = RibaatColors(
    surfacePage: Color(0xFFFBF9F3),
    surfaceCard: Color(0xFFFFFEFA),
    surfaceSunken: Color(0xFFEFEADB),
    surfaceBrandStrong: Color(0xFF3E4E32),
    borderSubtle: Color(0xFFE2DAC5),
    borderDefault: Color(0xFFC9BFA6),
    textPrimary: Color(0xFF211F19),
    textSecondary: Color(0xFF635C48),
    textMuted: Color(0xFF82795F),
    textLink: Color(0xFF4F6140),
    dangerFg: Color(0xFFA6473B),
    dangerBg: Color(0xFFF4E3DF),
    brandGreen600: Color(0xFF607247),
    brandGreen700: Color(0xFF4F6140),
    textOnBrand: Color(0xFFFFFEFA),
  );

  static const dark = RibaatColors(
    surfacePage: Color(0xFF201E18),
    surfaceCard: Color(0xFF2B2820),
    surfaceSunken: Color(0xFF1B1913),
    surfaceBrandStrong: Color(0xFF55663F),
    borderSubtle: Color(0xFF3A362C),
    borderDefault: Color(0xFF4A4536),
    textPrimary: Color(0xFFEDE6D6),
    textSecondary: Color(0xFFC4B99F),
    textMuted: Color(0xFF93876C),
    textLink: Color(0xFFA9BE8F),
    dangerFg: Color(0xFFD98A7C),
    dangerBg: Color(0xFF3C2420),
    brandGreen600: Color(0xFF7C9161),
    brandGreen700: Color(0xFF94A87A),
    textOnBrand: Color(0xFFF7F3E7),
  );
}

/// Amiri (display / headings) + IBM Plex Sans Arabic (UI/body).
/// Register both as fonts in pubspec.yaml (assets/fonts/…) before use.
class RibaatType {
  static TextStyle heading(RibaatColors c) => TextStyle(
        fontFamily: 'Amiri',
        fontSize: 36,
        fontWeight: FontWeight.w700,
        color: c.textPrimary,
        height: 1.25,
      );
  static TextStyle subheading(RibaatColors c) => TextStyle(
        fontFamily: 'IBMPlexSansArabic',
        fontSize: 14,
        color: c.textMuted,
        height: 1.55,
      );
  static TextStyle fieldLabel(RibaatColors c) => TextStyle(
        fontFamily: 'IBMPlexSansArabic',
        fontSize: 14,
        fontWeight: FontWeight.w500,
        color: c.textPrimary,
      );
  static TextStyle body(RibaatColors c) => TextStyle(
        fontFamily: 'IBMPlexSansArabic',
        fontSize: 16,
        color: c.textPrimary,
      );
  static TextStyle hint(RibaatColors c) => TextStyle(
        fontFamily: 'IBMPlexSansArabic',
        fontSize: 12,
        color: c.textMuted,
      );
  static TextStyle errorText(RibaatColors c) => TextStyle(
        fontFamily: 'IBMPlexSansArabic',
        fontSize: 12,
        color: c.dangerFg,
      );
  static TextStyle link(RibaatColors c) => TextStyle(
        fontFamily: 'IBMPlexSansArabic',
        fontSize: 14,
        color: c.textLink,
      );
  static TextStyle button() => const TextStyle(
        fontFamily: 'IBMPlexSansArabic',
        fontSize: 16,
        fontWeight: FontWeight.w600,
      );
}

class RibaatRadii {
  static const sm = 6.0;
  static const md = 10.0;
  static const lg = 14.0;
  static const pill = 999.0;
}

class RibaatSpace {
  static const s1 = 4.0, s2 = 8.0, s3 = 12.0, s4 = 16.0, s5 = 20.0, s6 = 24.0;
}
