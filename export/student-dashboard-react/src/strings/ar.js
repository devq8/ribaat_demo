/**
 * Single source of every Arabic string in the Student Dashboard.
 * No Arabic copy may live inline in JSX.
 *
 * Conventions carried over from the Ribaat content rules:
 * - Course/text titles are canonical proper nouns — never translated or shortened.
 * - Teachers always carry the د. honorific (see honorifics.doctor).
 * - Western digits inside Arabic strings for counts and HH:MM:SS durations.
 * - No emoji, no urgency or gamification language.
 */

export const ar = {
  honorifics: {
    doctor: 'د.',
  },

  nav: {
    brandAlt: 'رباط الحنابلة',
    dashboard: 'لوحة التحكم',
    catalogue: 'اكتشف الدورات',
    paths: 'المسارات',
    accountAria: 'الحساب',
  },

  accountMenu: {
    roleStudent: 'طالب',
    teacherDashboard: 'لوحة المعلم',
    adminDashboard: 'لوحة الإدارة',
    settings: 'الإعدادات',
    contact: 'تواصل معنا',
    signOut: 'تسجيل الخروج',
  },

  welcome: {
    greeting: (name) => `أهلاً، ${name}`,
    statsInProgress: (inProgress, completed) =>
      `${inProgress} دورات قيد الدراسة · ${completed} دورة مكتملة · شهادة واحدة صادرة`,
    statsPathComplete: (completed) =>
      `${completed} دورات مكتملة · شهادة المستوى الأول جاهزة للاستلام`,
    statsNoEnrollments: 'لم تبدأ أي دورة بعد',
  },

  announcements: {
    title: 'إعلانات',
    loading: 'جارٍ تحميل الإعلانات…',
    empty: 'لا إعلانات جديدة.',
    errorTitle: 'تعذر تحميل الإعلانات',
    errorBody: 'حدث خطأ أثناء الاتصال بالخادم.',
    retry: 'إعادة المحاولة',
  },

  courses: {
    tabInProgress: 'دوراتي المسجلة قيد الدراسة',
    tabCompleted: 'الدورات المكتملة',
    badgeInProgress: 'قيد الدراسة',
    badgeCompleted: 'مكتمل',
    ctaContinue: 'متابعة',
    ctaReview: 'مراجعة',
    lessonsRemaining: (remaining, duration) => `${remaining} الدروس المتبقية — ${duration}`,
    allLessonsWatched: (duration) => `تمت مشاهدة جميع الدروس — ${duration}`,
    showAll: (total) => `عرض جميع الدورات (${total})`,
    showLess: 'إخفاء',
    loading: 'جارٍ تحميل دوراتك…',
    errorTitle: 'تعذر تحميل الدورات',
    errorBody: 'حدث خطأ أثناء الاتصال بالخادم.',
    retry: 'إعادة المحاولة',
    emptyEnrollmentsTitle: 'لم تسجل في أي دورة بعد',
    emptyEnrollmentsBody: 'يمكنك تصفح الدورات المتاحة والبدء بأحد المسارات الدراسية عند رغبتك.',
    emptyEnrollmentsCta: 'تصفح الدورات',
    emptyInProgressTitle: 'لا دورة قيد الدراسة حالياً',
    emptyInProgressBody:
      'أتممت جميع دورات مسارك الحالي، ويمكنك بدء المستوى الثاني أو مراجعة دوراتك المكتملة.',
    emptyCompletedTitle: 'لم تكمل أي دورة بعد',
    emptyCompletedBody: 'ستظهر هنا الدورات بعد إتمام جميع دروسها.',
  },

  recommended: {
    title: 'ماذا تدرس بعد ذلك؟',
    subtitle: 'دورات مقترحة لم تسجل بها بعد.',
    enrol: 'سجل الآن',
    prevAria: 'السابق',
    nextAria: 'التالي',
    loading: 'جارٍ تحميل المقترحات…',
    emptyTitle: 'لا توجد مقترحات حالياً',
    emptyBody: 'ستظهر هنا دورات مقترحة بعد إتمام مزيد من الدروس.',
    errorTitle: 'تعذر تحميل المقترحات',
    errorBody: 'حدث خطأ أثناء الاتصال بالخادم.',
    retry: 'إعادة المحاولة',
  },

  path: {
    title: 'مساري',
    levelOne: 'المستوى الأول',
    progressSummary: (completed, total) => `${completed} من ${total} دورات مكتملة`,
    details: 'عرض تفاصيل المسار ←',
    stepCompleted: 'مكتملة',
    stepCurrent: 'قيد الدراسة',
    stepAvailable: 'متاحة دون شرط',
    stepLocked: 'مغلقة',
    stepCertificate: 'شهادة',
    stepCertificateReady: 'جاهزة للاستلام',
    certificateTitle: 'أتممت المستوى الأول',
    certificateBody: 'شهادتك بالسند المتصل جاهزة للاستلام.',
    certificateCta: 'استلام الشهادة',
    loading: 'جارٍ تحميل المسار…',
    emptyTitle: 'لست مسجلاً في أي مسار',
    emptyBody: 'يمكنك الالتحاق بأحد المسارات الدراسية من صفحة المسارات.',
    errorTitle: 'تعذر تحميل المسار',
    errorBody: 'حدث خطأ أثناء الاتصال بالخادم.',
    retry: 'إعادة المحاولة',
  },

  calendar: {
    title: 'التقويم',
    monthLabel: 'أغسطس 2026 · اختر يوماً',
    weekdaysShort: ['أحد', 'اثن', 'ثلا', 'أرب', 'خمس', 'جمع', 'سبت'],
    weekdaysLong: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
    selectedLabel: (weekday, day, month) => `${weekday} ${day} ${month}`,
    monthName: 'أغسطس',
    legendLesson: 'درس جديد',
    legendExam: 'اختبار',
    legendLive: 'لقاء مباشر',
    noEvents: 'لا مواعيد في هذا اليوم.',
    loading: 'جارٍ تحميل التقويم…',
    errorTitle: 'تعذر تحميل التقويم',
    errorBody: 'حدث خطأ أثناء الاتصال بالخادم.',
    retry: 'إعادة المحاولة',
  },

  footer: {
    about:
      'مدرسة شرعية تأصيلية — دورات ودروس في العقيدة والفقه والحديث والسيرة، بإجازات بالسند المتصل.',
    linksHeading: 'روابط',
    certificatesHeading: 'الشهادات',
    verifyCertificate: 'الاستعلام عن شهادة',
    contact: 'تواصل معنا',
    copyright: '© 1448هـ — رباط الحنابلة. جميع الحقوق محفوظة.',
  },

  states: {
    loadingAria: 'جارٍ التحميل',
  },
};

export default ar;
