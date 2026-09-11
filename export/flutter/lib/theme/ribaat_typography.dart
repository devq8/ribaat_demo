import 'package:flutter/material.dart';

/// Amiri for display/citation, IBM Plex Sans Arabic for UI and body.
/// letterSpacing is pinned to 0 — never track Arabic text.
class RibaatType {
  static const display = 'Amiri';
  static const sans = 'IBMPlexSansArabic';

  static TextStyle _sans(double size, FontWeight w, Color color) => TextStyle(
        fontFamily: sans,
        fontSize: size,
        fontWeight: w,
        height: 1.6,
        letterSpacing: 0,
        color: color,
      );

  static TextStyle h1(Color c) => TextStyle(
        fontFamily: display,
        fontSize: 30,
        fontWeight: FontWeight.w700,
        height: 1.35,
        letterSpacing: 0,
        color: c,
      );

  static TextStyle h2(Color c) => TextStyle(
        fontFamily: display,
        fontSize: 22,
        fontWeight: FontWeight.w700,
        height: 1.4,
        letterSpacing: 0,
        color: c,
      );

  static TextStyle h3(Color c) => TextStyle(
        fontFamily: display,
        fontSize: 19,
        fontWeight: FontWeight.w700,
        height: 1.4,
        letterSpacing: 0,
        color: c,
      );

  static TextStyle md(Color c) => _sans(17, FontWeight.w600, c);
  static TextStyle base(Color c) => _sans(15, FontWeight.w400, c);
  static TextStyle baseSemi(Color c) => _sans(15, FontWeight.w600, c);
  static TextStyle sm(Color c) => _sans(14, FontWeight.w400, c);
  static TextStyle smSemi(Color c) => _sans(14, FontWeight.w600, c);
  static TextStyle xs(Color c) => _sans(12.5, FontWeight.w400, c);
}
