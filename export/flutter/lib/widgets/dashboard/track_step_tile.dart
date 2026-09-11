import 'package:flutter/material.dart';

import '../../models/dashboard_models.dart';
import '../../theme/ribaat_colors.dart';
import '../../theme/ribaat_metrics.dart';
import '../../theme/ribaat_typography.dart';
import '../core/ribaat_badge.dart';
import '../core/ribaat_button.dart';

/// One node of the RTL stepper. Text is start-aligned so titles, badges and
/// prerequisite notes line up across the row.
class TrackStepTile extends StatelessWidget {
  const TrackStepTile({super.key, required this.step, this.onAction});

  final TrackStep step;
  final VoidCallback? onAction;

  @override
  Widget build(BuildContext context) {
    final c = context.c;
    final v = _visuals(c, step.status);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          width: 44,
          height: 44,
          alignment: Alignment.center,
          decoration: BoxDecoration(
            color: v.nodeBg,
            shape: BoxShape.circle,
            border: v.nodeBorder,
          ),
          child: Icon(v.icon, size: 18, color: v.iconColor),
        ),
        const SizedBox(height: RibaatMetrics.space3),
        SizedBox(
          height: 44,
          child: Text(
            step.title,
            style: RibaatType.smSemi(v.titleColor),
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
          ),
        ),
        const SizedBox(height: RibaatMetrics.space2),
        RibaatBadge(label: v.badgeLabel, tone: v.badgeTone),
        const SizedBox(height: RibaatMetrics.space2),
        SizedBox(
          height: 52,
          child: Text(
            step.subtitle,
            style: RibaatType.xs(c.textMuted),
            maxLines: 3,
            overflow: TextOverflow.ellipsis,
          ),
        ),
        if (step.isOpen)
          RibaatButton(
            label: step.actionLabel,
            variant: RibaatButtonVariant.outline,
            size: RibaatButtonSize.sm,
            onPressed: onAction,
          ),
      ],
    );
  }
}

class _StepVisuals {
  const _StepVisuals({
    required this.nodeBg,
    required this.nodeBorder,
    required this.icon,
    required this.iconColor,
    required this.titleColor,
    required this.badgeTone,
    required this.badgeLabel,
  });

  final Color nodeBg;
  final BoxBorder? nodeBorder;
  final IconData icon;
  final Color iconColor;
  final Color titleColor;
  final RibaatBadgeTone badgeTone;
  final String badgeLabel;
}

_StepVisuals _visuals(RibaatColors c, StepStatus s) {
  switch (s) {
    case StepStatus.completed:
      return _StepVisuals(
        nodeBg: c.green600,
        nodeBorder: null,
        icon: RibaatIcons.check,
        iconColor: c.textOnBrand,
        titleColor: c.textPrimary,
        badgeTone: RibaatBadgeTone.success,
        badgeLabel: 'مكتمل',
      );
    case StepStatus.current:
      return _StepVisuals(
        nodeBg: c.surfaceCard,
        nodeBorder: Border.all(color: c.green600, width: 2),
        icon: RibaatIcons.current,
        iconColor: c.green600,
        titleColor: c.textPrimary,
        badgeTone: RibaatBadgeTone.brand,
        badgeLabel: 'قيد الدراسة',
      );
    case StepStatus.available:
      return _StepVisuals(
        nodeBg: c.surfaceCard,
        nodeBorder: Border.all(color: c.borderBrand, width: 2),
        icon: RibaatIcons.play,
        iconColor: c.textBrand,
        titleColor: c.textPrimary,
        badgeTone: RibaatBadgeTone.neutral,
        badgeLabel: 'متاحة دون شرط',
      );
    case StepStatus.locked:
      return _StepVisuals(
        nodeBg: c.surfaceSunken,
        nodeBorder: null,
        icon: RibaatIcons.lock,
        iconColor: c.textMuted,
        titleColor: c.textMuted,
        badgeTone: RibaatBadgeTone.neutral,
        badgeLabel: 'مغلقة',
      );
    case StepStatus.certificateLocked:
      return _StepVisuals(
        nodeBg: c.brown100,
        nodeBorder: Border.all(color: c.borderSubtle),
        icon: RibaatIcons.award,
        iconColor: c.textAccent,
        titleColor: c.textSecondary,
        badgeTone: RibaatBadgeTone.accent,
        badgeLabel: 'شهادة',
      );
  }
}
