import 'package:flutter/material.dart';

import '../../theme/ribaat_colors.dart';
import '../../theme/ribaat_metrics.dart';
import '../../theme/ribaat_typography.dart';
import '../core/ribaat_avatar.dart';
import '../core/ribaat_pressable.dart';

/// Top bar: hamburger (opens the nav drawer), wordmark, student avatar.
class RibaatAppBar extends StatelessWidget {
  const RibaatAppBar({
    super.key,
    required this.studentName,
    required this.onMenu,
    this.showDeviceStatus = true,
  });

  final String studentName;
  final VoidCallback onMenu;

  /// iPad frames show a light status line; the web build hides it.
  final bool showDeviceStatus;

  @override
  Widget build(BuildContext context) {
    final c = context.c;
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 22, vertical: 10),
      decoration: BoxDecoration(
        color: c.surfaceCard,
        border: Border(bottom: BorderSide(color: c.borderSubtle)),
      ),
      child: Row(
        children: [
          RibaatPressable(
            pressedScale: 0.94,
            onTap: onMenu,
            child: SizedBox(
              width: RibaatMetrics.touchTarget,
              height: RibaatMetrics.touchTarget,
              child: Icon(RibaatIcons.menu, size: 22, color: c.textSecondary),
            ),
          ),
          const SizedBox(width: RibaatMetrics.space3),
          Image.asset('assets/logos/ribaat-wordmark.png', height: 26),
          const Spacer(),
          if (showDeviceStatus) ...[
            Text('9:41', style: RibaatType.xs(c.textMuted)),
            const SizedBox(width: RibaatMetrics.space2),
            Icon(Icons.wifi, size: 15, color: c.textMuted),
            const SizedBox(width: 6),
            Icon(Icons.battery_full, size: 17, color: c.textMuted),
            const SizedBox(width: RibaatMetrics.space4),
          ],
          RibaatAvatar(name: studentName),
        ],
      ),
    );
  }
}
