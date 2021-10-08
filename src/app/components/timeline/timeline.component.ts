import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit {
  startDate: Date = new Date('01/01/2021');
  endDate: Date = new Date();
  data: any = [
    {
      name: 'First',
      color: 'blue',
      start_date: '01/01/2021',
      end_date: '05/23/2021',
    },
    {
      name: 'Second',
      color: 'red',
      start_date: '05/23/2021',
      end_date: '08/30/2021',
    },
    {
      name: 'Third',
      color: 'red',
      start_date: '08/30/2021',
      end_date: '',
    },
  ];

  constructor() {
    this.data = this.data.map((i) => {
      i.position = this.computePosition(i);
      i.width = this.computeWidth(i);
      return i;
    });
  }

  ngOnInit(): void {}

  computePosition(event) {
    const range: any =
      new Date().valueOf() - new Date(this.startDate).valueOf();
    const d =
      new Date(event.start_date).valueOf() - new Date(this.startDate).valueOf();
    return (d / range) * 100 + '%';
  }

  computeWidth(event) {
    const range: any =
      new Date().valueOf() - new Date(this.startDate).valueOf();
    const d =
      new Date(event.end_date).valueOf() - new Date(event.start_date).valueOf();

    return (d / range) * 100 + '%';
  }
}
