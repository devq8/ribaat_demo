enum StepStatus { completed, current, available, locked, certificateLocked }

class Course {
  const Course({
    required this.title,
    required this.instructor,
    required this.progress,
    required this.totalLessons,
    required this.doneLessons,
    required this.duration,
  });

  /// Canonical scholarly title — never translated or shortened.
  final String title;

  /// Bare name; the honorific "د." is prepended by the UI.
  final String instructor;
  final int progress; // 0..100
  final int totalLessons;
  final int doneLessons;
  final String duration; // HH:MM:SS

  bool get isComplete => progress >= 100;
  int get remainingLessons => totalLessons - doneLessons;

  String get metaLine => isComplete
      ? 'تمت مشاهدة جميع الدروس — $duration'
      : '$remainingLessons الدروس المتبقية — $duration';
}

class RecommendedCourse {
  const RecommendedCourse({
    required this.title,
    required this.instructor,
    required this.category,
    required this.metaLine,
    this.hint,
  });

  final String title;
  final String instructor;
  final String category;
  final String metaLine;
  final String? hint;
}

class TrackStep {
  const TrackStep({
    required this.title,
    required this.status,
    required this.subtitle,
  });

  final String title;
  final StepStatus status;
  final String subtitle;

  bool get isOpen =>
      status == StepStatus.current || status == StepStatus.available;

  String get actionLabel =>
      status == StepStatus.available ? 'ابدأ الدورة' : 'متابعة الدراسة';
}

/// A رباط — one study path. The student may follow several.
class StudyTrack {
  const StudyTrack({
    required this.id,
    required this.label,
    required this.level,
    required this.steps,
  });

  final String id;
  final String label; // رباط الحنابلة …
  final String level; // المستوى الأول …
  final List<TrackStep> steps;

  List<TrackStep> get courseSteps =>
      steps.where((s) => s.status != StepStatus.certificateLocked).toList();

  int get completedCount =>
      courseSteps.where((s) => s.status == StepStatus.completed).length;

  int get percent => courseSteps.isEmpty
      ? 0
      : ((completedCount / courseSteps.length) * 100).round();

  TrackStep? get currentStep {
    for (final s in steps) {
      if (s.status == StepStatus.current) return s;
    }
    return null;
  }

  TrackStep? get nextOpenStep {
    for (final s in steps) {
      if (s.isOpen) return s;
    }
    return null;
  }

  String get summaryLine =>
      'أتممت $completedCount من ${courseSteps.length} دورات في هذا المسار.';
}
