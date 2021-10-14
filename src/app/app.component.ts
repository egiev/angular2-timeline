import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  events: Array<{
    name: string;
    color: string;
    start_date: Date;
    end_date: Date;
  }> = [
    {
      name: 'Incorporation',
      color: 'blue',
      start_date: new Date('01/01/2021'),
      end_date: null,
    },
    {
      name: 'Gross Assets > $50M',
      color: 'blue',
      start_date: new Date('03/23/2021'),
      end_date: null,
    },
    {
      name: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
      color: 'red',
      start_date: new Date('05/30/2021'),
      end_date: new Date('12/15/2021'),
    },
  ];
}
