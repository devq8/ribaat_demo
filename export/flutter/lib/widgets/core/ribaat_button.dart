import 'package:flutter/material.dart';

import '../../theme/ribaat_colors.dart';
import '../../theme/ribaat_metrics.dart';
import '../../theme/ribaat_typography.dart';
import 'ribaat_pressable.dart';

enum RibaatButtonVariant { primary, secondary, outline, ghost }

enum RibaatButtonSize { sm, md }

class RibaatButton extends StatelessWidget {
  const RibaatButton({
    super.key,
    required this.label,
    this.onPressed,
    this.variant = RibaatButtonVariant.primary,
    this.size = RibaatButtonSize.md,
    this.fullWidth = false,
  });

  final String label;
  final VoidCallback? onPressed;
  final RibaatButtonVariant variant;
  final RibaatButtonSize size;
  final bool fullWidth;

  @override
  Widget build(BuildContext context) {
    final c = context.c;
    final isSm = size == RibaatButtonSize.sm;

    late Color bg;
    late Color fg;
    Border? border;
    switch (variant) {
      case RibaatButtonVariant.primary:
        bg = c.surfaceBrand;
        fg = c.textOnBrand;
        break;
      case RibaatButtonVariant.secondary:
        bg = c.surfaceAccent;
        fg = c.textOnBrand;
        break;
      case RibaatButtonVariant.outline:
        bg = Colors.transparent;
        fg = c.textBrand;
        border = Border.all(color: c.borderBrand);
        break;
      case RibaatButtonVariant.ghost:
        bg = Colors.transparent;
        fg = c.textBrand;
        break;
    }

    return RibaatPressable(
      onTap: onPressed,
      pressedScale: 0.97,
      child: Container(
        width: fullWidth ? double.infinity : null,
        // 44pt minimum even for the small variant's tap area.
        constraints: BoxConstraints(
          minHeight: isSm ? 40 : RibaatMetrics.touchTarget,
        ),
        padding: EdgeInsets.symmetric(horizontal: isSm ? 14 : 20),
        decoration: BoxDecoration(
          color: bg,
          border: border,
          borderRadius: BorderRadius.circular(RibaatMetrics.radiusMd),
        ),
        alignment: Alignment.center,
        child: Text(
          label,
          textAlign: TextAlign.center,
          style: isSm ? RibaatType.smSemi(fg) : RibaatType.baseSemi(fg),
        ),
      ),
    );
  }
}
