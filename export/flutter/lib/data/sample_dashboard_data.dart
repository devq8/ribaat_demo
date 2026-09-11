import '../models/dashboard_models.dart';

const kEnrolledCourses = <Course>[
  Course(title: 'ثلاثة الأصول', instructor: 'عبد العزيز العيدان', progress: 100, totalLessons: 4, doneLessons: 4, duration: '02:10:00'),
  Course(title: 'متن الورقات في أصول الفقه', instructor: 'عبد العزيز العيدان', progress: 62, totalLessons: 8, doneLessons: 5, duration: '05:40:00'),
  Course(title: 'الأربعين النووية', instructor: 'أنس اليتامى', progress: 18, totalLessons: 11, doneLessons: 2, duration: '06:20:00'),
  Course(title: 'مقدمة في السيرة', instructor: 'أنس اليتامى', progress: 0, totalLessons: 6, doneLessons: 0, duration: '03:15:00'),
];

const kRecommendedCourses = <RecommendedCourse>[
  RecommendedCourse(title: 'نواقض الإسلام', instructor: 'عبد العزيز العيدان', category: 'عقيدة', metaLine: '02:54:00 — 6 دروس — مستوى مبتدئ'),
  RecommendedCourse(title: 'عمدة الفقه', instructor: 'عبد العزيز العيدان', category: 'فقه', metaLine: '09:12:00 — 14 درساً — مستوى متوسط'),
  RecommendedCourse(title: 'بلوغ المرام', instructor: 'أنس اليتامى', category: 'حديث', metaLine: '10:05:00 — 18 درساً — مستوى متوسط', hint: 'يكمل ما بدأته في الأربعين النووية.'),
  RecommendedCourse(title: 'تفسير الجلالين', instructor: 'أنس اليتامى', category: 'تفسير', metaLine: '12:30:00 — 20 درساً — مستوى متقدم'),
  RecommendedCourse(title: 'الرحيق المختوم', instructor: 'أنس اليتامى', category: 'سيرة', metaLine: '07:48:00 — 12 درساً — مستوى مبتدئ'),
  RecommendedCourse(title: 'الآداب الشرعية', instructor: 'عبد العزيز العيدان', category: 'آداب', metaLine: '04:30:00 — 8 دروس — مستوى مبتدئ'),
];

const kTracks = <StudyTrack>[
  StudyTrack(
    id: 'hanabila',
    label: 'رباط الحنابلة',
    level: 'المستوى الأول',
    steps: [
      TrackStep(title: 'ثلاثة الأصول', status: StepStatus.completed, subtitle: 'مكتملة'),
      TrackStep(title: 'القواعد الأربع', status: StepStatus.completed, subtitle: 'مكتملة'),
      TrackStep(title: 'نواقض الإسلام', status: StepStatus.completed, subtitle: 'مكتملة'),
      TrackStep(title: 'متن الورقات في أصول الفقه', status: StepStatus.current, subtitle: 'قيد الدراسة — 62% مكتمل'),
      TrackStep(title: 'مقدمة في السيرة', status: StepStatus.available, subtitle: 'لا تتطلب دورات سابقة — يمكنك البدء بها في أي وقت.'),
      TrackStep(title: 'الأربعين النووية', status: StepStatus.locked, subtitle: 'يتطلب اجتياز الاختبار النهائي لدورة متن الورقات.'),
      TrackStep(title: 'شهادة المستوى الأول', status: StepStatus.certificateLocked, subtitle: 'تُصدر بعد إتمام دورات المستوى — إجازة بالسند المتصل.'),
    ],
  ),
  StudyTrack(
    id: 'shafiiya',
    label: 'رباط الشافعية',
    level: 'المستوى الأول',
    steps: [
      TrackStep(title: 'متن أبي شجاع', status: StepStatus.completed, subtitle: 'مكتملة'),
      TrackStep(title: 'متن الزبد', status: StepStatus.current, subtitle: 'قيد الدراسة — 24% مكتمل'),
      TrackStep(title: 'الورقات للجويني', status: StepStatus.available, subtitle: 'لا تتطلب دورات سابقة — يمكنك البدء بها في أي وقت.'),
      TrackStep(title: 'منهاج الطالبين', status: StepStatus.locked, subtitle: 'يتطلب إتمام متن الزبد.'),
      TrackStep(title: 'شهادة المستوى الأول', status: StepStatus.certificateLocked, subtitle: 'تُصدر بعد إتمام دورات المستوى — إجازة بالسند المتصل.'),
    ],
  ),
  StudyTrack(
    id: 'hadith',
    label: 'رباط الحديث',
    level: 'تمهيدي',
    steps: [
      TrackStep(title: 'نخبة الفكر', status: StepStatus.available, subtitle: 'لا تتطلب دورات سابقة — يمكنك البدء بها في أي وقت.'),
      TrackStep(title: 'الأربعين النووية', status: StepStatus.locked, subtitle: 'يتطلب إتمام نخبة الفكر.'),
      TrackStep(title: 'عمدة الأحكام', status: StepStatus.locked, subtitle: 'يتطلب إتمام الأربعين النووية.'),
      TrackStep(title: 'بلوغ المرام', status: StepStatus.locked, subtitle: 'يتطلب إتمام عمدة الأحكام.'),
      TrackStep(title: 'شهادة الرباط', status: StepStatus.certificateLocked, subtitle: 'تُصدر بعد إتمام دورات المسار — إجازة بالسند المتصل.'),
    ],
  ),
];
