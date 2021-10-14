import { Component, Input, OnInit } from '@angular/core';

interface Event {
  name: string;
  color: string;
  start_date: Date;
  end_date: Date;
}

interface TimelineEvent extends Event {
  position: string;
  barWidth: string;
}

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit {
  @Input() events: Array<Event>;
  data: Array<TimelineEvent>;

  todayDatePosition: string;

  minDate: Date;
  maxDate: Date;

  constructor() {}

  ngOnInit(): void {
    // Get date range
    this.minDate = this.getMinDate(this.events);
    this.maxDate = this.getMaxDate(this.events);

    // Get position of the todays date marker
    this.todayDatePosition = this.computePosition(new Date());

    this.data = this.events.map((event, i) => {
      const evt: any = { ...event };
      evt.position = this.computePosition(evt.start_date);
      evt.color = this.validateColor(evt.color);

      /**
       * Check if an event has an end_date
       * If true: it will use the event end_date to compute the width of the bar
       *
       * Otherwise:
       * Check if the next event is not null.
       *
       * If true: The start_date of the next next event will
       * be use to compute the width of the bar of the current event.
       *
       * Else: will use the current date(today) to compute the width of the bar.
       */
      if (event.end_date) {
        evt.barWidth = this.computeWidth(evt.start_date, evt.end_date);
      } else {
        if (this.events[i + 1]) {
          const nextEvent: Event = this.events[i + 1];

          evt.barWidth = this.computeWidth(
            evt.start_date,
            nextEvent.start_date
          );
        } else {
          evt.barWidth = this.computeWidth(evt.start_date, new Date());
        }
      }

      return evt;
    });
  }

  getMinDate(dates: Array<Event>) {
    return new Date(
      Math.min.apply(null, [
        ...dates.filter((i) => i.start_date).map((i) => new Date(i.start_date)),
      ])
    );
  }

  getMaxDate(dates: Array<Event>) {
    const todaysDateTwoYearsAgo = new Date();
    todaysDateTwoYearsAgo.setFullYear(todaysDateTwoYearsAgo.getFullYear() - 2);

    const filterEndDates = [
      ...dates.filter((i) => i.end_date).map((i) => new Date(i.end_date)),
    ];

    const endDate =
      filterEndDates.length > 0
        ? Math.max.apply(null, [...filterEndDates])
        : new Date();

    return todaysDateTwoYearsAgo > endDate ? todaysDateTwoYearsAgo : endDate;
  }

  computePosition(date: Date) {
    const range: any =
      new Date(this.maxDate).valueOf() - new Date(this.minDate).valueOf();
    const d = new Date(date).valueOf() - new Date(this.minDate).valueOf();
    return Math.abs(d / range) * 100 + '%';
  }

  computeWidth(start: Date, end: Date) {
    const range: any =
      new Date(this.maxDate).valueOf() - new Date(this.minDate).valueOf();
    const d = new Date(end).valueOf() - new Date(start).valueOf();

    return Math.abs(d / range) * 100 + '%';
  }

  validateColor(color: string) {
    const validColor = ['red', 'blue', 'gray'];

    return validColor.includes(color) ? color : '';
  }
}
