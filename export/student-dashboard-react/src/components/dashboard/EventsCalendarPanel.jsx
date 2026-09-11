import { useState } from 'react';
import { CalendarDays } from 'lucide-react';
import CalendarMonthGrid from './CalendarMonthGrid.jsx';
import CalendarLegend from './CalendarLegend.jsx';
import CalendarDayAgenda from './CalendarDayAgenda.jsx';
import { SkeletonBlock } from '../states/Skeleton.jsx';
import EmptyState from '../states/EmptyState.jsx';
import ErrorState from '../states/ErrorState.jsx';
import { STATUS } from '../states/status.js';
import { buildMonthCells, eventsForDay } from '../../data/calendarModel.js';
import { ar } from '../../strings/ar.js';

const panel = {
  background: 'var(--surface-card)',
  border: '1px solid var(--border-subtle)',
  borderRadius: 'var(--radius-lg)',
  padding: 'var(--space-5) 18px',
};

function PanelHead() {
  return (
    <div style={{ marginBottom: 'var(--space-3)' }}>
      <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 'var(--text-md)', color: 'var(--text-primary)' }}>
        {ar.calendar.title}
      </h2>
      <p style={{ margin: '3px 0 0', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{ar.calendar.monthLabel}</p>
    </div>
  );
}

/* ---- Labelled state variants ---- */

export function EventsCalendarLoading() {
  return (
    <div style={panel} aria-busy="true">
      <PanelHead />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, minmax(0, 1fr))', gap: '3px' }}>
        {Array.from({ length: 35 }).map((_, i) => (
          <SkeletonBlock key={i} height="30px" />
        ))}
      </div>
    </div>
  );
}

export function EventsCalendarEmpty() {
  return (
    <EmptyState
      icon={CalendarDays}
      title={ar.calendar.title}
      body={ar.calendar.noEvents}
      padding="var(--space-10) var(--space-5)"
    />
  );
}

export function EventsCalendarError({ onRetry }) {
  return (
    <ErrorState
      title={ar.calendar.errorTitle}
      body={ar.calendar.errorBody}
      retryLabel={ar.calendar.retry}
      onRetry={onRetry}
      padding="var(--space-8) var(--space-5)"
    />
  );
}

/* ---- Region ---- */

export default function EventsCalendarPanel({
  status = STATUS.ready,
  events = [],
  daysInMonth = 31,
  firstWeekdayOffset = 6,
  today,
  initialDay = 1,
  onRetry,
}) {
  const [selectedDay, setSelectedDay] = useState(initialDay);

  if (status === STATUS.loading) return <EventsCalendarLoading />;
  if (status === STATUS.error) return <EventsCalendarError onRetry={onRetry} />;
  if (status === STATUS.empty) return <EventsCalendarEmpty />;

  const cells = buildMonthCells({ daysInMonth, firstWeekdayOffset, events, selectedDay, today });
  const dayEvents = eventsForDay(events, selectedDay);
  const weekday = ar.calendar.weekdaysLong[(firstWeekdayOffset + selectedDay - 1) % 7];

  return (
    <div style={panel}>
      <PanelHead />
      <CalendarMonthGrid cells={cells} onSelectDay={setSelectedDay} />
      <CalendarLegend />
      <CalendarDayAgenda
        label={ar.calendar.selectedLabel(weekday, selectedDay, ar.calendar.monthName)}
        events={dayEvents}
      />
    </div>
  );
}
