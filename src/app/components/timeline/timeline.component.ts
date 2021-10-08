import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';

interface Event {
  name: string;
  color: string;
  start_date: string | Date;
  end_date: string | Date;
}

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit {
  @Input() events: Array<Event>;

  data: Array<{
    name: string;
    color: string;
    start_date: string | Date;
    end_date: string | Date;
    position: string;
    barWidth: string;
  }>;

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

    this.data = this.events.map((event) => {
      const evt: any = { ...event };
      evt.position = this.computePosition(evt.start_date);
      evt.barWidth = this.computeWidth(evt.start_date, evt.end_date);
      evt.color = this.validateColor(evt.color);

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

    const endDate = new Date(
      Math.max.apply(null, [
        ...dates.filter((i) => i.end_date).map((i) => new Date(i.end_date)),
      ])
    );

    return todaysDateTwoYearsAgo > endDate ? todaysDateTwoYearsAgo : endDate;
  }

  computePosition(date: Date) {
    const range: any =
      new Date(this.maxDate).valueOf() - new Date(this.minDate).valueOf();
    const d = new Date(date).valueOf() - new Date(this.minDate).valueOf();
    return (d / range) * 100 + '%';
  }

  computeWidth(start: Date, end: Date) {
    const range: any =
      new Date(this.maxDate).valueOf() - new Date(this.minDate).valueOf();
    const d = new Date(end).valueOf() - new Date(start).valueOf();

    return (d / range) * 100 + '%';
  }

  validateColor(color: string) {
    const validColor = ['red', 'blue', 'gray'];

    return validColor.includes(color) ? color : '';
  }
}
