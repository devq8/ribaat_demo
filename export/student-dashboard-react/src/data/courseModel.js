import { ar } from '../strings/ar.js';

/** Derives the display fields a course card needs from a raw enrollment record. */
export function toCourseCardModel(course) {
  const isCompleted = course.progress >= 100;
  const remaining = course.totalLessons - course.doneLessons;
  return {
    ...course,
    isCompleted,
    badgeTone: isCompleted ? 'success' : 'brand',
    badgeLabel: isCompleted ? ar.courses.badgeCompleted : ar.courses.badgeInProgress,
    ctaVariant: isCompleted ? 'outline' : 'primary',
    ctaLabel: isCompleted ? ar.courses.ctaReview : ar.courses.ctaContinue,
    meta: isCompleted
      ? ar.courses.allLessonsWatched(course.duration)
      : ar.courses.lessonsRemaining(remaining, course.duration),
  };
}

export const COURSE_PAGE_SIZE = 6;
