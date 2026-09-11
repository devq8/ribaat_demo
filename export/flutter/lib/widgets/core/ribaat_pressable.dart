import 'package:flutter/material.dart';

import '../../theme/ribaat_metrics.dart';

/// Touch-first press response: a restrained scale-down on tap-down.
/// Used everywhere the web design would have used :hover.
class RibaatPressable extends StatefulWidget {
  const RibaatPressable({
    super.key,
    required this.child,
    this.onTap,
    this.pressedScale = 0.99,
  });

  final Widget child;
  final VoidCallback? onTap;
  final double pressedScale;

  @override
  State<RibaatPressable> createState() => _RibaatPressableState();
}

class _RibaatPressableState extends State<RibaatPressable> {
  bool _down = false;

  void _set(bool v) {
    if (_down != v) setState(() => _down = v);
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      behavior: HitTestBehavior.opaque,
      onTapDown: (_) => _set(true),
      onTapUp: (_) => _set(false),
      onTapCancel: () => _set(false),
      onTap: widget.onTap,
      child: AnimatedScale(
        scale: _down ? widget.pressedScale : 1,
        duration: RibaatMetrics.fast,
        curve: RibaatMetrics.easeStandard,
        child: widget.child,
      ),
    );
  }
}
