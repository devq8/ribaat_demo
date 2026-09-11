import 'package:flutter/material.dart';

import '../../theme/ribaat_colors.dart';
import '../../theme/ribaat_metrics.dart';
import '../../theme/ribaat_typography.dart';
import '../core/ribaat_avatar.dart';
import '../core/ribaat_pressable.dart';

class RibaatNavDestination {
  const RibaatNavDestination(this.id, this.label, this.icon);
  final String id;
  final String label;
  final IconData icon;
}

const kRibaatNavDestinations = <RibaatNavDestination>[
  RibaatNavDestination('dashboard', 'لوحة التحكم', RibaatIcons.dashboard),
  RibaatNavDestination('courses', 'الدورات', RibaatIcons.courses),
  RibaatNavDestination('tracks', 'المسارات', RibaatIcons.tracks),
  RibaatNavDestination('certificates', 'الشهادات', RibaatIcons.certificates),
  RibaatNavDestination('settings', 'الإعدادات', RibaatIcons.settings),
];

/// Slides in from the right (RTL — same side as the hamburger) over a scrim.
class RibaatNavDrawer extends StatelessWidget {
  const RibaatNavDrawer({
    super.key,
    required this.open,
    required this.activeId,
    required this.studentName,
    required this.onClose,
    required this.onSelect,
    this.width = 288,
  });

  final bool open;
  final String activeId;
  final String studentName;
  final VoidCallback onClose;
  final ValueChanged<String> onSelect;
  final double width;

  @override
  Widget build(BuildContext context) {
    final c = context.c;
    return Stack(
      children: [
        IgnorePointer(
          ignoring: !open,
          child: AnimatedOpacity(
            opacity: open ? 1 : 0,
            duration: RibaatMetrics.normal,
            curve: RibaatMetrics.easeStandard,
            child: GestureDetector(
              onTap: onClose,
              child: Container(color: c.surfaceOverlay),
            ),
          ),
        ),
        AnimatedPositioned(
          duration: RibaatMetrics.normal,
          curve: RibaatMetrics.easeStandard,
          top: 0,
          bottom: 0,
          right: open ? 0 : -width,
          width: width,
          child: Container(
            padding: const EdgeInsets.fromLTRB(14, 18, 14, 16),
            decoration: BoxDecoration(
              color: c.surfaceCard,
              border: Border(left: BorderSide(color: c.borderSubtle)),
              boxShadow: RibaatMetrics.shadowLg(Colors.black),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Row(
                  children: [
                    Image.asset('assets/logos/ribaat-mark.png', width: 32, height: 32),
                    const SizedBox(width: RibaatMetrics.space2),
                    Expanded(
                      child: Text('رباط الحنابلة', style: RibaatType.h3(c.textPrimary)),
                    ),
                    RibaatPressable(
                      pressedScale: 0.94,
                      onTap: onClose,
                      child: SizedBox(
                        width: RibaatMetrics.touchTarget,
                        height: RibaatMetrics.touchTarget,
                        child: Icon(RibaatIcons.close, size: 20, color: c.textSecondary),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: RibaatMetrics.space4),
                Expanded(
                  child: ListView(
                    padding: EdgeInsets.zero,
                    children: [
                      for (final d in kRibaatNavDestinations)
                        Padding(
                          padding: const EdgeInsets.only(bottom: RibaatMetrics.space1),
                          child: _NavTile(
                            destination: d,
                            active: d.id == activeId,
                            onTap: () => onSelect(d.id),
                          ),
                        ),
                    ],
                  ),
                ),
                Divider(color: c.borderSubtle, height: RibaatMetrics.space6),
                Row(
                  children: [
                    RibaatAvatar(name: studentName, size: 32),
                    const SizedBox(width: RibaatMetrics.space2),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(studentName, style: RibaatType.sm(c.textPrimary)),
                        Text('طالب', style: RibaatType.xs(c.textMuted)),
                      ],
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}

class _NavTile extends StatelessWidget {
  const _NavTile({required this.destination, required this.active, required this.onTap});

  final RibaatNavDestination destination;
  final bool active;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final c = context.c;
    return RibaatPressable(
      pressedScale: 0.98,
      onTap: onTap,
      child: Container(
        height: 48,
        padding: const EdgeInsets.symmetric(horizontal: 14),
        decoration: BoxDecoration(
          color: active ? c.green100 : Colors.transparent,
          borderRadius: BorderRadius.circular(RibaatMetrics.radiusMd),
        ),
        child: Row(
          children: [
            Icon(destination.icon, size: 20, color: active ? c.textBrand : c.textSecondary),
            const SizedBox(width: RibaatMetrics.space3),
            Text(
              destination.label,
              style: active
                  ? RibaatType.baseSemi(c.textBrand)
                  : RibaatType.base(c.textSecondary),
            ),
          ],
        ),
      ),
    );
  }
}
