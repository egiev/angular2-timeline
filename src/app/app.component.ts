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
    start_date: string | Date;
    end_date: string | Date;
  }> = [
    {
      name: 'Incorporation',
      color: 'blue',
      start_date: '01/01/2021',
      end_date: '',
    },
    {
      name: 'Gross Assets > $50M',
      color: 'blue',
      start_date: '03/23/2021',
      end_date: '',
    },
    {
      name: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
      color: 'red',
      start_date: '05/30/2021',
      end_date: '07/15/2021',
    },
  ];
}
