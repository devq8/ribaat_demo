import 'package:flutter/material.dart';

import '../../theme/ribaat_colors.dart';
import '../../theme/ribaat_metrics.dart';
import '../../theme/ribaat_typography.dart';
import 'ribaat_pressable.dart';

/// Cupertino-flavoured segmented control in the Ribaat skin.
/// Used to switch between أربطة (study paths); scrolls if they outgrow the row.
class RibaatSegmentedControl extends StatelessWidget {
  const RibaatSegmentedControl({
    super.key,
    required this.segments,
    required this.selectedId,
    required this.onChanged,
  });

  final List<({String id, String label})> segments;
  final String selectedId;
  final ValueChanged<String> onChanged;

  @override
  Widget build(BuildContext context) {
    final c = context.c;
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: Container(
        padding: const EdgeInsets.all(3),
        decoration: BoxDecoration(
          color: c.surfaceSunken,
          border: Border.all(color: c.borderSubtle),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            for (final s in segments)
              Padding(
                padding: const EdgeInsets.only(left: 3),
                child: RibaatPressable(
                  pressedScale: 0.98,
                  onTap: () => onChanged(s.id),
                  child: AnimatedContainer(
                    duration: RibaatMetrics.fast,
                    curve: RibaatMetrics.easeStandard,
                    height: 40,
                    padding: const EdgeInsets.symmetric(horizontal: 20),
                    alignment: Alignment.center,
                    decoration: BoxDecoration(
                      color: s.id == selectedId ? c.surfaceCard : Colors.transparent,
                      borderRadius: BorderRadius.circular(9),
                      boxShadow: s.id == selectedId
                          ? RibaatMetrics.shadowSm(c.textPrimary)
                          : const [],
                    ),
                    child: Text(
                      s.label,
                      style: s.id == selectedId
                          ? RibaatType.smSemi(c.textPrimary)
                          : RibaatType.sm(c.textSecondary),
                    ),
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}
