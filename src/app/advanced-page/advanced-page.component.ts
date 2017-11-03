import { Component } from '@angular/core';
import { trigger, transition, animate, style, query, stagger } from '@angular/animations';
import { ModalService } from '../modal.service';
import { KeyboardBinding, Keys } from '../keyboard.service';
import { AnimationCountService } from '../animation-count.service';

const SECTIONS = {
  one: 1,
  two: 2,
  three: 3
}

@Component({
  selector: 'app-advanced-page',
  templateUrl: './advanced-page.component.html',
  styleUrls: ['./advanced-page.component.scss'],
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
      transition('1 => 2', [
        query(':enter', [
          style({ position: 'absolute', opacity: 0, transform: 'translateX(-100px)' })
        ]),
        query(':leave', [
          style({ opacity: 1, transform: 'translateX(0px)' }),
          animate('300ms ease-out', style({ opacity: 0, transform: 'translateX(100px)' })),
          style({ position: 'absolute' }),
        ]),
        query(':enter', [
          style({ position: 'static' }),
          animate('300ms ease-out', style({ opacity: 1, transform: 'none' })),
        ])
      ]),
      transition('2 <=> 1', [
        query(':enter', [
          style({ position: 'absolute', opacity: 0, transform: 'translateX(100px)' })
        ]),
        query(':leave', [
          style({ opacity: 1, transform: 'translateX(0px)' }),
          animate('300ms ease-out', style({ opacity: 0, transform: 'translateX(-100px)' })),
          style({ position: 'absolute' }),
        ]),
        query(':enter', [
          style({ position: 'static' }),
          animate('300ms ease-out', style({ opacity: 1, transform: 'none' })),
        ])
      ]),
      transition('* => 1, * => 2', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateX(-100px)' }),
          animate('300ms ease-out', style({ opacity: 1, transform: 'none' })),
        ])
      ]),
    ]),
  ]
})
export class AdvancedPageComponent {
  section = SECTIONS.one;
  sections = SECTIONS;

  photos: any[] = [
    { section: SECTIONS.one,
      photos: [
        {title: '1', className: 'g0', src: "/assets/gallery/1.jpg"},
        {title: '2', className: 'g1', src: "/assets/gallery/2.jpg"},
        {title: '3', className: 'g2', src: "/assets/gallery/3.jpg"},
        {title: '5', className: 'g0', src: "/assets/gallery/5.jpg"},
        {title: '6', className: 'g1', src: "/assets/gallery/6.jpg"},
        {title: '8', className: 'g0', src: "/assets/gallery/8.jpg"},
        {title: '10', className: 'g1', src: "/assets/gallery/10.jpg"},
        {title: '12', className: 'g0', src: "/assets/gallery/12.jpg"},
        {title: '13', className: 'g1', src: "/assets/gallery/13.jpg"},
        {title: '15', className: 'g0', src: "/assets/gallery/15.jpg"},
        {title: '16', className: 'g2', src: "/assets/gallery/16.jpg"},
        {title: '30', className: 'g0', src: "/assets/gallery/17.jpg"},
        {title: '18', className: 'g3', src: "/assets/gallery/18.jpg"},
        {title: '21', className: 'g1', src: "/assets/gallery/21.jpg"},
        {title: '19', className: 'g0', src: "/assets/gallery/19.jpg"},
        {title: '23', className: 'g0', src: "/assets/gallery/23.jpg"},
        {title: '25', className: 'g0', src: "/assets/gallery/4.jpg"},
        {title: '26', className: 'g3', src: "/assets/gallery/7.jpg"},
        {title: '27', className: 'g1', src: "/assets/gallery/11.jpg"},
        {title: '29', className: 'g2', src: "/assets/gallery/14.jpg"}
      ]
    },
    { section: SECTIONS.two,
      photos: [
        {title: '15', className: 'g0', src: "/assets/gallery/15.jpg"},
        {title: '3', className: 'g2', src: "/assets/gallery/3.jpg"},
        {title: '12', className: 'g0', src: "/assets/gallery/12.jpg"},
        {title: '27', className: 'g1', src: "/assets/gallery/11.jpg"},
        {title: '29', className: 'g2', src: "/assets/gallery/14.jpg"},
        {title: '16', className: 'g2', src: "/assets/gallery/16.jpg"},
        {title: '5', className: 'g0', src: "/assets/gallery/5.jpg"},
        {title: '6', className: 'g1', src: "/assets/gallery/6.jpg"},
        {title: '13', className: 'g1', src: "/assets/gallery/13.jpg"},
        {title: '19', className: 'g0', src: "/assets/gallery/19.jpg"},
        {title: '23', className: 'g0', src: "/assets/gallery/23.jpg"},
        {title: '25', className: 'g0', src: "/assets/gallery/4.jpg"},
        {title: '26', className: 'g3', src: "/assets/gallery/7.jpg"},
        {title: '8', className: 'g0', src: "/assets/gallery/8.jpg"},
        {title: '10', className: 'g1', src: "/assets/gallery/10.jpg"},
        {title: '30', className: 'g0', src: "/assets/gallery/17.jpg"},
        {title: '18', className: 'g3', src: "/assets/gallery/18.jpg"},
        {title: '21', className: 'g1', src: "/assets/gallery/21.jpg"},
        {title: '1', className: 'g0', src: "/assets/gallery/1.jpg"},
        {title: '2', className: 'g1', src: "/assets/gallery/2.jpg"},
      ]
    },
    { section: SECTIONS.three,
      photos: [
        {title: '31', className: 'g3', src: "/assets/gallery/24.jpg"},
        {title: '32', className: 'g1', src: "/assets/gallery/9.jpg"},
        {title: '34', className: 'g0', src: "/assets/gallery/22.jpg"},
        {title: '36', className: 'g0', src: "/assets/gallery/20.jpg"},
        {title: '19', className: 'g0', src: "/assets/gallery/19.jpg"},
        {title: '23', className: 'g0', src: "/assets/gallery/23.jpg"},
        {title: '25', className: 'g0', src: "/assets/gallery/4.jpg"},
        {title: '26', className: 'g3', src: "/assets/gallery/7.jpg"},
        {title: '8', className: 'g0', src: "/assets/gallery/8.jpg"},
        {title: '10', className: 'g1', src: "/assets/gallery/10.jpg"},
        {title: '30', className: 'g0', src: "/assets/gallery/17.jpg"},
        {title: '18', className: 'g3', src: "/assets/gallery/18.jpg"},
        {title: '21', className: 'g1', src: "/assets/gallery/21.jpg"},
        {title: '1', className: 'g0', src: "/assets/gallery/1.jpg"},
        {title: '31', className: 'g3', src: "/assets/gallery/24.jpg"},
        {title: '32', className: 'g1', src: "/assets/gallery/9.jpg"},
        {title: '34', className: 'g0', src: "/assets/gallery/22.jpg"},
        {title: '36', className: 'g0', src: "/assets/gallery/20.jpg"},
        {title: '15', className: 'g0', src: "/assets/gallery/15.jpg"},
        {title: '3', className: 'g2', src: "/assets/gallery/3.jpg"},
      ]
    },
  ];

  private _keydownBinding: KeyboardBinding;

  constructor(private _modalService: ModalService, private _animationCount: AnimationCountService) {
    this._animationCount.setTotal(4);
  }

  ngOnInit() {
    this._keydownBinding = new KeyboardBinding([Keys.KEY_UP, Keys.KEY_DOWN], keyCode => {
      if (keyCode === Keys.KEY_UP) {
        this.up();
      } else if (keyCode === Keys.KEY_DOWN) {
        this.down();
      }
    });
  }

  ngOnDestroy() {
    this._keydownBinding.deregister();
  }

  up() {
    this.section = Math.max(this.section - 1, 1);
  }

  down() {
    this.section = Math.min(this.section + 1, Object.keys(SECTIONS).length);
  }

  getPhotos(section: number) {
    const entries = this.photos.find(e => e.section == section);
    return entries ? entries.photos : [];
  }

  isActive(section: number) {
    return section == this.section;
  }

  showModalFor(item: any) {
    this._modalService.show();
  }
}
