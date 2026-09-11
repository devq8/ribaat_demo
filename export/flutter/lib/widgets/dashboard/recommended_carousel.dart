import 'package:flutter/material.dart';

import '../../models/dashboard_models.dart';
import '../../theme/ribaat_colors.dart';
import '../../theme/ribaat_metrics.dart';
import '../../theme/ribaat_typography.dart';
import '../core/page_dot_indicator.dart';
import 'recommended_card.dart';

/// "ماذا تدرس بعد ذلك؟" — a real PageView: swipe, peek of the next card,
/// dot indicator. No prev/next arrows.
class RecommendedCarousel extends StatefulWidget {
  const RecommendedCarousel({
    super.key,
    required this.courses,
    this.viewportFraction = 0.31,
    this.cardHeight = 330,
    this.onEnrol,
  });

  final List<RecommendedCourse> courses;
  final double viewportFraction;
  final double cardHeight;
  final ValueChanged<RecommendedCourse>? onEnrol;

  @override
  State<RecommendedCarousel> createState() => _RecommendedCarouselState();
}

class _RecommendedCarouselState extends State<RecommendedCarousel> {
  late final PageController _controller =
      PageController(viewportFraction: widget.viewportFraction);
  int _index = 0;

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final c = context.c;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('ماذا تدرس بعد ذلك؟', style: RibaatType.h2(c.textPrimary)),
        const SizedBox(height: 6),
        Text(
          'دورات مقترحة لم تسجل بها بعد — اسحب لاستعراض المزيد.',
          style: RibaatType.sm(c.textMuted),
        ),
        const SizedBox(height: RibaatMetrics.space4),
        SizedBox(
          height: widget.cardHeight,
          child: PageView.builder(
            controller: _controller,
            padEnds: false,
            itemCount: widget.courses.length,
            onPageChanged: (i) => setState(() => _index = i),
            itemBuilder: (context, i) => Padding(
              padding: const EdgeInsetsDirectional.only(end: 18),
              child: RecommendedCard(
                course: widget.courses[i],
                onEnrol: () => widget.onEnrol?.call(widget.courses[i]),
              ),
            ),
          ),
        ),
        const SizedBox(height: RibaatMetrics.space4),
        Center(child: PageDotIndicator(count: widget.courses.length, index: _index)),
      ],
    );
  }
}
