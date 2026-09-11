import { ar } from '../strings/ar.js';

export const CALENDAR_EVENT_TYPES = {
  lesson: { label: ar.calendar.legendLesson, color: 'var(--ribaat-blue-600)' },
  exam: { label: ar.calendar.legendExam, color: 'var(--ribaat-brown-600)' },
  live: { label: ar.calendar.legendLive, color: 'var(--ribaat-green-600)' },
};

/** Builds the fixed 6×7 cell matrix the month grid renders. */
export function buildMonthCells({ daysInMonth, firstWeekdayOffset, events, selectedDay, today }) {
  const blank = (key) => ({ key, day: null, dots: [] });
  const cells = [];
  for (let i = 0; i < firstWeekdayOffset; i++) cells.push(blank(`lead-${i}`));
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({
      key: `day-${day}`,
      day,
      isSelected: day === selectedDay,
      isToday: day === today,
      dots: events
        .filter((e) => e.day === day)
        .map((e) => ({ id: e.id, color: CALENDAR_EVENT_TYPES[e.type].color })),
    });
  }
  while (cells.length < 42) cells.push(blank(`trail-${cells.length}`));
  return cells;
}

export function eventsForDay(events, day) {
  return events
    .filter((e) => e.day === day)
    .map((e) => ({
      id: e.id,
      title: e.title,
      color: CALENDAR_EVENT_TYPES[e.type].color,
      meta: [CALENDAR_EVENT_TYPES[e.type].label, e.course, e.time].filter(Boolean).join(' · '),
    }));
}
