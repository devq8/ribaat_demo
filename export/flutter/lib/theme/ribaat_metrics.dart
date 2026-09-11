import 'package:flutter/material.dart';

/// Spacing (4pt base), radii, motion and touch metrics.
class RibaatMetrics {
  static const space1 = 4.0;
  static const space2 = 8.0;
  static const space3 = 12.0;
  static const space4 = 16.0;
  static const space5 = 20.0;
  static const space6 = 24.0;
  static const space8 = 32.0;
  static const space10 = 40.0;
  static const space12 = 48.0;

  static const radiusSm = 6.0;
  static const radiusMd = 10.0;
  static const radiusLg = 14.0;

  /// Minimum fingertip target — never go below this on iPad.
  static const touchTarget = 44.0;

  static const fast = Duration(milliseconds: 120);
  static const normal = Duration(milliseconds: 200);
  static const slow = Duration(milliseconds: 320);
  static const easeStandard = Cubic(0.2, 0, 0, 1);

  /// Low, warm-tinted elevation. Cards lean on the hairline border.
  static List<BoxShadow> shadowSm(Color ink) =>
      [BoxShadow(color: ink.withOpacity(0.06), blurRadius: 8, offset: const Offset(0, 2))];
  static List<BoxShadow> shadowLg(Color ink) =>
      [BoxShadow(color: ink.withOpacity(0.18), blurRadius: 32, offset: const Offset(0, 8))];
}

/// Swap these for lucide_icons constants (LucideIcons.menu, …) if the app
/// pulls in the Lucide package — the HTML design used Lucide outline icons.
class RibaatIcons {
  static const menu = Icons.menu;
  static const close = Icons.close;
  static const dashboard = Icons.dashboard_outlined;
  static const courses = Icons.menu_book_outlined;
  static const tracks = Icons.route_outlined;
  static const certificates = Icons.workspace_premium_outlined;
  static const settings = Icons.settings_outlined;
  static const check = Icons.check;
  static const current = Icons.circle_outlined;
  static const play = Icons.play_arrow_rounded;
  static const lock = Icons.lock_outline;
  static const award = Icons.workspace_premium_outlined;
  static const book = Icons.menu_book_outlined;
}
