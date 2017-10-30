import { Component } from '@angular/core';
import { trigger, transition, animate, style, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-advanced-page',
  templateUrl: './advanced-page.component.html',
  styleUrls: ['./advanced-page.component.css'],
  animations: [
    trigger('listAnimation', [
      transition(':enter', []),
      transition('* => 3', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(-100px)' }),
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 1, transform: 'none' })),
          ]),
        ])
      ]),
      transition('3 => 2', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(-100px)', position: 'absolute' }),
        ]),
        query(':leave', [
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 0, transform: 'translateY(-100px)' })),
          ]),
        ]),
        query(':leave', [
          style({ position: 'absolute', opacity: 0 })
        ]),
        query(':enter', [
          style({ position: 'static' }),
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 1, transform: 'none' })),
          ]),
        ])
      ]),
      transition('* => 1', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateX(-100px)' }),
          animate('300ms ease-out', style({ opacity: 1, transform: 'none' })),
        ])
      ]),
      transition('* => 1, * => 2', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateX(100px)' }),
          animate('300ms ease-out', style({ opacity: 1, transform: 'none' })),
        ])
      ]),
    ]),
  ]
})
export class AdvancedPageComponent {
  section = 1;
  sections = {
    about: 1,
    query: 2,
    stagger: 3
  }

  photos: any[] = [
    { section: 1,
      photos: [
        {title: '1', className: 'g0'},
        {title: '2', className: 'g1'},
        {title: '3', className: 'g2'},
        {title: '4', className: 'g3'},
        {title: '5', className: 'g0'},
        {title: '6', className: 'g1'},
        {title: '7', className: 'g2'},
        {title: '8', className: 'g0'},
        {title: '9', className: 'g3'},
        {title: '10', className: 'g1'},
        {title: '11', className: 'g2'},
        {title: '12', className: 'g0'}
      ]
    },
    { section: 2,
      photos: [
        {title: '13', className: 'g1'},
        {title: '14', className: 'g3'},
        {title: '15', className: 'g0'},
        {title: '16', className: 'g2'},
        {title: '17', className: 'g0'},
        {title: '18', className: 'g3'},
        {title: '19', className: 'g0'},
        {title: '20', className: 'g2'},
        {title: '21', className: 'g1'},
        {title: '22', className: 'g3'},
        {title: '23', className: 'g0'},
        {title: '24', className: 'g1'}
      ]
    },
    { section: 3,
      photos: [
        {title: '25', className: 'g0'},
        {title: '26', className: 'g3'},
        {title: '27', className: 'g1'},
        {title: '28', className: 'g0'},
        {title: '29', className: 'g2'},
        {title: '30', className: 'g0'},
        {title: '31', className: 'g3'},
        {title: '32', className: 'g1'},
        {title: '33', className: 'g0'},
        {title: '34', className: 'g0'},
        {title: '35', className: 'g1'},
        {title: '36', className: 'g0'}
      ]
    },
  ];

  constructor() { }

  getPhotos(section: number) {
    const entries = this.photos.find(e => e.section == section);
    return entries ? entries.photos : [];
  }

  isActive(section: number) {
    return section == this.section;
  }
}
