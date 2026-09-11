import 'package:flutter/material.dart';

import '../../models/dashboard_models.dart';
import '../../theme/ribaat_colors.dart';
import '../../theme/ribaat_metrics.dart';
import '../../theme/ribaat_typography.dart';
import '../core/ribaat_badge.dart';
import '../core/ribaat_button.dart';
import '../core/ribaat_progress_bar.dart';
import '../core/ribaat_segmented_control.dart';
import 'track_step_tile.dart';

/// "مساري" — first section on the dashboard: the path is what pulls the
/// student forward, so the summary + next step precede the course grid.
class TrackSection extends StatelessWidget {
  const TrackSection({
    super.key,
    required this.tracks,
    required this.selectedTrackId,
    required this.onTrackChanged,
    this.onContinue,
    this.onStepAction,
  });

  final List<StudyTrack> tracks;
  final String selectedTrackId;
  final ValueChanged<String> onTrackChanged;
  final VoidCallback? onContinue;
  final ValueChanged<TrackStep>? onStepAction;

  StudyTrack get _track =>
      tracks.firstWhere((t) => t.id == selectedTrackId, orElse: () => tracks.first);

  @override
  Widget build(BuildContext context) {
    final c = context.c;
    final track = _track;
    final next = track.nextOpenStep;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('مساري', style: RibaatType.h2(c.textPrimary)),
        const SizedBox(height: 6),
        Text(
          'تسلسل الدورات ضمن المسار، وما يلزم لفتح الدورة التالية.',
          style: RibaatType.sm(c.textMuted),
        ),
        const SizedBox(height: RibaatMetrics.space4),
        RibaatSegmentedControl(
          segments: [for (final t in tracks) (id: t.id, label: t.label)],
          selectedId: track.id,
          onChanged: onTrackChanged,
        ),
        const SizedBox(height: RibaatMetrics.space5),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 26, vertical: 24),
          decoration: BoxDecoration(
            color: c.surfaceCard,
            border: Border.all(color: c.borderSubtle),
            borderRadius: BorderRadius.circular(RibaatMetrics.radiusLg),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _TrackSummary(track: track, next: next, onContinue: onContinue),
              Divider(color: c.borderSubtle, height: RibaatMetrics.space10),
              _Stepper(track: track, onStepAction: onStepAction),
            ],
          ),
        ),
      ],
    );
  }
}

class _TrackSummary extends StatelessWidget {
  const _TrackSummary({required this.track, required this.next, this.onContinue});

  final StudyTrack track;
  final TrackStep? next;
  final VoidCallback? onContinue;

  @override
  Widget build(BuildContext context) {
    final c = context.c;
    return Row(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Text(track.label, style: RibaatType.h3(c.textPrimary)),
                  const SizedBox(width: RibaatMetrics.space2),
                  RibaatBadge(label: track.level, tone: RibaatBadgeTone.brand),
                ],
              ),
              const SizedBox(height: RibaatMetrics.space2),
              Text(track.summaryLine, style: RibaatType.sm(c.textSecondary)),
              const SizedBox(height: RibaatMetrics.space3),
              SizedBox(width: 460, child: RibaatProgressBar(value: track.percent)),
            ],
          ),
        ),
        const SizedBox(width: RibaatMetrics.space5),
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              next == null ? 'لا توجد دورة متاحة الآن' : 'التالي: ${next!.title}',
              style: RibaatType.xs(c.textMuted),
            ),
            const SizedBox(height: RibaatMetrics.space2),
            RibaatButton(
              label: track.currentStep == null ? 'ابدأ المسار' : 'متابعة المسار',
              onPressed: onContinue,
            ),
          ],
        ),
      ],
    );
  }
}

class _Stepper extends StatelessWidget {
  const _Stepper({required this.track, this.onStepAction});

  final StudyTrack track;
  final ValueChanged<TrackStep>? onStepAction;

  @override
  Widget build(BuildContext context) {
    final c = context.c;
    final done = track.completedCount / (track.steps.length - 1);

    return LayoutBuilder(
      builder: (context, constraints) {
        return Stack(
          children: [
            // Connector rail behind the nodes.
            Positioned.directional(
              textDirection: Directionality.of(context),
              top: 21,
              start: 22,
              end: 22,
              child: Container(height: 2, color: c.borderSubtle),
            ),
            Positioned.directional(
              textDirection: Directionality.of(context),
              top: 21,
              start: 22,
              child: Container(
                width: (constraints.maxWidth - 44) * done.clamp(0.0, 1.0),
                height: 2,
                color: c.green600,
              ),
            ),
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                for (final step in track.steps)
                  Expanded(
                    child: Padding(
                      padding: const EdgeInsetsDirectional.only(end: 18),
                      child: TrackStepTile(
                        step: step,
                        onAction: () => onStepAction?.call(step),
                      ),
                    ),
                  ),
              ],
            ),
          ],
        );
      },
    );
  }
}
