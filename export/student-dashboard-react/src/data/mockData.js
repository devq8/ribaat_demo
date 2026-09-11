/**
 * Fixture data standing in for the API payloads.
 * Replace each export with a fetch/react-query call; component props are unchanged.
 */

export const student = { name: 'ماجد' };

export const enrolledCourses = [
  { id: 'thalathat-al-usul', title: 'ثلاثة الأصول', instructor: 'عبد العزيز العيدان', progress: 100, totalLessons: 4, doneLessons: 4, duration: '02:10:00', art: '/assets/courses/thalathat-al-usul.png' },
  { id: 'waraqat', title: 'متن الورقات في أصول الفقه', instructor: 'عبد العزيز العيدان', progress: 62, totalLessons: 8, doneLessons: 5, duration: '05:40:00', art: null },
  { id: 'arbain', title: 'الأربعين النووية', instructor: 'أنس اليتامى', progress: 18, totalLessons: 11, doneLessons: 2, duration: '06:20:00', art: null },
  { id: 'seerah-intro', title: 'مقدمة في السيرة', instructor: 'أنس اليتامى', progress: 0, totalLessons: 6, doneLessons: 0, duration: '03:15:00', art: null },
  { id: 'umdat-al-ahkam', title: 'عمدة الأحكام', instructor: 'عبد العزيز العيدان', progress: 45, totalLessons: 10, doneLessons: 4, duration: '07:05:00', art: null },
  { id: 'adab-shariyya', title: 'الآداب الشرعية', instructor: 'عبد العزيز العيدان', progress: 30, totalLessons: 7, doneLessons: 2, duration: '04:30:00', art: null },
  { id: 'bulugh-al-maram', title: 'بلوغ المرام', instructor: 'أنس اليتامى', progress: 5, totalLessons: 14, doneLessons: 1, duration: '10:05:00', art: null },
  { id: 'jalalayn', title: 'تفسير الجلالين', instructor: 'أنس اليتامى', progress: 60, totalLessons: 9, doneLessons: 5, duration: '12:30:00', art: null },
];

export const recommendedCourses = [
  { id: 'kitab-al-tawhid', title: 'كتاب التوحيد', instructor: 'عبد العزيز العيدان', category: 'عقيدة', meta: '08:30:00 — مستوى متوسط', hint: null, art: '/assets/courses/kitab-al-tawhid.png' },
  { id: 'umdat-al-fiqh', title: 'عمدة الفقه', instructor: 'عبد العزيز العيدان', category: 'فقه', meta: '09:12:00 — مستوى متوسط', hint: null, art: null },
  { id: 'bulugh-al-maram-rec', title: 'بلوغ المرام', instructor: 'أنس اليتامى', category: 'حديث', meta: '10:05:00 — مستوى متوسط', hint: 'يكمل ما بدأته في الأربعين النووية.', art: null },
  { id: 'jalalayn-rec', title: 'تفسير الجلالين', instructor: 'أنس اليتامى', category: 'تفسير', meta: '12:30:00 — مستوى متقدم', hint: null, art: null },
  { id: 'raheeq', title: 'الرحيق المختوم', instructor: 'أنس اليتامى', category: 'سيرة', meta: '07:48:00 — مستوى مبتدئ', hint: null, art: null },
  { id: 'adab-rec', title: 'الآداب الشرعية', instructor: 'عبد العزيز العيدان', category: 'آداب', meta: '04:30:00 — مستوى مبتدئ', hint: null, art: null },
];

export const announcements = [
  { id: 'a1', day: 'الأحد', date: '12 صفر 1448هـ', text: 'يبدأ التسجيل في دورة عمدة الفقه يوم الأحد القادم، والمقاعد محدودة.' },
  { id: 'a2', day: 'السبت', date: '5 صفر 1448هـ', text: 'موعد الاختبار النهائي لدورة متن الورقات في أصول الفقه: الساعة 8 مساءً بتوقيت الكويت.' },
];

/** status: 'completed' | 'current' | 'available' | 'locked' | 'certificate-locked' | 'certificate-ready' */
export const pathSteps = [
  { id: 's1', title: 'ثلاثة الأصول', status: 'completed' },
  { id: 's2', title: 'القواعد الأربع', status: 'completed' },
  { id: 's3', title: 'نواقض الإسلام', status: 'completed' },
  { id: 's4', title: 'متن الورقات في أصول الفقه', status: 'current' },
  { id: 's5', title: 'مقدمة في السيرة', status: 'available' },
  { id: 's6', title: 'الأربعين النووية', status: 'locked' },
  { id: 's7', title: 'فصول في الآداب', status: 'locked' },
  { id: 's8', title: 'شهادة المستوى الأول', status: 'certificate-locked' },
];

/** type: 'lesson' | 'exam' | 'live' */
export const calendarEvents = [
  { id: 'e1', day: 2, type: 'lesson', title: 'الدرس السادس: أقسام الحكم الشرعي', course: 'متن الورقات', time: '8:00 م' },
  { id: 'e2', day: 5, type: 'live', title: 'لقاء مباشر لمناقشة الأربعين النووية', course: 'الأربعين النووية', time: '9:00 م' },
  { id: 'e3', day: 8, type: 'exam', title: 'فتح نافذة الاختبار النصفي', course: 'متن الورقات', time: '10:00 ص' },
  { id: 'e4', day: 12, type: 'lesson', title: 'الدرس الثالث: نسب النبي ﷺ ومولده', course: 'مقدمة في السيرة', time: '8:00 م' },
  { id: 'e5', day: 14, type: 'exam', title: 'إغلاق نافذة الاختبار النصفي', course: 'متن الورقات', time: '9:00 م' },
  { id: 'e6', day: 19, type: 'live', title: 'لقاء مباشر: أسئلة الطلاب', course: 'عمدة الأحكام', time: '9:00 م' },
  { id: 'e7', day: 23, type: 'lesson', title: 'الدرس الخامس: آداب طالب العلم', course: 'الآداب الشرعية', time: '8:00 م' },
  { id: 'e8', day: 27, type: 'exam', title: 'اختبار نهاية دورة الأربعين النووية', course: 'الأربعين النووية', time: '8:00 م' },
];

export const calendarToday = 3;
export const calendarFirstWeekdayOffset = 6; // blank cells before day 1
export const calendarDaysInMonth = 31;
