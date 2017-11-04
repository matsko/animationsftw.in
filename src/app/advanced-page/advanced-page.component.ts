import { HostBinding, Component } from '@angular/core';
import { trigger, transition, state, animate, style, query, stagger, animateChild } from '@angular/animations';
import { ModalService } from '../modal.service';
import { KeyboardBinding, Keys } from '../keyboard.service';
import { AnimationCountService } from '../animation-count.service';
import { PhotoPipe } from '../photo.pipe';

const SECTIONS = {
  one: 1,
  two: 2,
  three: 3
};

const PAGE_ANIMATIONS = [
  {title: 'Page Animation', fileName: '/assets/code/a1-page.example-ts'},
  {title: 'Left Animation', fileName: '/assets/code/a1-left.example-ts'},
  {title: 'Right Animation', fileName: '/assets/code/a1-right.example-ts'},
  {title: 'Stagger Animation', fileName: '/assets/code/a1-stagger.example-ts'},
];

const PHOTO_FILTER = new PhotoPipe();

function filterPhotos(photos: any, criteria: string): any[] {
  return PHOTO_FILTER.transform(photos, criteria);
}

@Component({
  selector: 'app-advanced-page',
  templateUrl: './advanced-page.component.html',
  styleUrls: ['./advanced-page.component.scss'],
  animations: [
    trigger('pageAnimations', [
      transition(':enter', [
        query('.photo-record, .menu li, form', [
          style({opacity: 0, transform: 'translateY(-100px)'}),
          stagger(-30, [
            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))
          ])
        ])
      ])
    ]),
    trigger('filterAnimation', [
      transition(':enter, * => -1', []),
      transition(':increment', [
        query('*', [
          // this fails here
          animateChild()
        ])
      ]),
      transition(':increment', [
        query('*', [
          stagger(50, animateChild())
        ])
      ])
    ]),
    trigger('photoAnimation', [
      state('active', style({ opacity: '*' })),
      state('inactive', style({ opacity: '0.2' })),
      transition('active <=> inactive', animate(300))
    ]),
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
  @HostBinding('@pageAnimations')
  public animatePage = true;

  section: number;
  sections = SECTIONS;

  private _criteria: string;
  private _photoResults: any[] = [];
  public filterTotal = -1;

  photos: any[] = [
    { section: SECTIONS.one,
      photos: [
        {title: '1', className: 'g0', src: "/assets/gallery/1.jpg", tags: ["woman"]},
        {title: '2', className: 'g1', src: "/assets/gallery/2.jpg", tags: ["cow"]},
        {title: '3', className: 'g2', src: "/assets/gallery/3.jpg", tags: ["forest"]},
        {title: '5', className: 'g0', src: "/assets/gallery/5.jpg", tags: ["book"]},
        {title: '6', className: 'g1', src: "/assets/gallery/6.jpg", tags: ["man"]},
        {title: '8', className: 'g0', src: "/assets/gallery/8.jpg", tags: ["shows"]},
        {title: '10', className: 'g1', src: "/assets/gallery/10.jpg", tags: ["class", "class room", "lecture", "school"]},
        {title: '12', className: 'g0', src: "/assets/gallery/12.jpg", tags: ["books"]},
        {title: '13', className: 'g1', src: "/assets/gallery/13.jpg", tags: ["beach", "la", "men"]},
        {title: '15', className: 'g0', src: "/assets/gallery/15.jpg", tags: ["forest"]},
        {title: '16', className: 'g2', src: "/assets/gallery/16.jpg", tags: ["apples"]},
        {title: '30', className: 'g0', src: "/assets/gallery/17.jpg", tags: ["wine"]},
        {title: '18', className: 'g3', src: "/assets/gallery/18.jpg", tags: ["road", "highway"]},
        {title: '21', className: 'g1', src: "/assets/gallery/21.jpg", tags: ["watch", "man", "style"]},
        {title: '19', className: 'g0', src: "/assets/gallery/19.jpg", tags: ["style", "vest", "man"]},
        {title: '23', className: 'g0', src: "/assets/gallery/23.jpg", tags: ["blonde", "woman", "beautiful"]},
        {title: '25', className: 'g0', src: "/assets/gallery/4.jpg", tags: ["laptop", "apple", "macbook"]},
        {title: '26', className: 'g3', src: "/assets/gallery/7.jpg", tags: ["style", "watch", "suite", "man"]},
        {title: '27', className: 'g1', src: "/assets/gallery/11.jpg", tags: ["blonde", "woman", "theatre", "beautiful"]},
        {title: '29', className: 'g2', src: "/assets/gallery/14.jpg", tags: ["forest", "red", "beautiful"]}
      ]
    },
    { section: SECTIONS.two,
      photos: [
        {title: '15', className: 'g0', src: "/assets/gallery/15.jpg", tags: [""]},
        {title: '3', className: 'g2', src: "/assets/gallery/3.jpg", tags: [""]},
        {title: '12', className: 'g0', src: "/assets/gallery/12.jpg", tags: [""]},
        {title: '27', className: 'g1', src: "/assets/gallery/11.jpg", tags: [""]},
        {title: '29', className: 'g2', src: "/assets/gallery/14.jpg", tags: [""]},
        {title: '16', className: 'g2', src: "/assets/gallery/16.jpg", tags: [""]},
        {title: '5', className: 'g0', src: "/assets/gallery/5.jpg", tags: [""]},
        {title: '6', className: 'g1', src: "/assets/gallery/6.jpg", tags: [""]},
        {title: '13', className: 'g1', src: "/assets/gallery/13.jpg", tags: [""]},
        {title: '19', className: 'g0', src: "/assets/gallery/19.jpg", tags: [""]},
        {title: '23', className: 'g0', src: "/assets/gallery/23.jpg", tags: [""]},
        {title: '25', className: 'g0', src: "/assets/gallery/4.jpg", tags: [""]},
        {title: '26', className: 'g3', src: "/assets/gallery/7.jpg", tags: [""]},
        {title: '8', className: 'g0', src: "/assets/gallery/8.jpg", tags: [""]},
        {title: '10', className: 'g1', src: "/assets/gallery/10.jpg", tags: [""]},
        {title: '30', className: 'g0', src: "/assets/gallery/17.jpg", tags: [""]},
        {title: '18', className: 'g3', src: "/assets/gallery/18.jpg", tags: [""]},
        {title: '21', className: 'g1', src: "/assets/gallery/21.jpg", tags: [""]},
        {title: '1', className: 'g0', src: "/assets/gallery/1.jpg", tags: [""]},
        {title: '2', className: 'g1', src: "/assets/gallery/2.jpg", tags: [""]},
      ]
    },
    { section: SECTIONS.three,
      photos: [
        {title: '31', className: 'g3', src: "/assets/gallery/24.jpg", tags: [""]},
        {title: '32', className: 'g1', src: "/assets/gallery/9.jpg", tags: [""]},
        {title: '34', className: 'g0', src: "/assets/gallery/22.jpg", tags: [""]},
        {title: '36', className: 'g0', src: "/assets/gallery/20.jpg", tags: [""]},
        {title: '19', className: 'g0', src: "/assets/gallery/19.jpg", tags: [""]},
        {title: '23', className: 'g0', src: "/assets/gallery/23.jpg", tags: [""]},
        {title: '25', className: 'g0', src: "/assets/gallery/4.jpg", tags: [""]},
        {title: '26', className: 'g3', src: "/assets/gallery/7.jpg", tags: [""]},
        {title: '8', className: 'g0', src: "/assets/gallery/8.jpg", tags: [""]},
        {title: '10', className: 'g1', src: "/assets/gallery/10.jpg", tags: [""]},
        {title: '30', className: 'g0', src: "/assets/gallery/17.jpg", tags: [""]},
        {title: '18', className: 'g3', src: "/assets/gallery/18.jpg", tags: [""]},
        {title: '21', className: 'g1', src: "/assets/gallery/21.jpg", tags: [""]},
        {title: '1', className: 'g0', src: "/assets/gallery/1.jpg", tags: [""]},
        {title: '31', className: 'g3', src: "/assets/gallery/24.jpg", tags: [""]},
        {title: '32', className: 'g1', src: "/assets/gallery/9.jpg", tags: [""]},
        {title: '34', className: 'g0', src: "/assets/gallery/22.jpg", tags: [""]},
        {title: '36', className: 'g0', src: "/assets/gallery/20.jpg", tags: [""]},
        {title: '15', className: 'g0', src: "/assets/gallery/15.jpg", tags: [""]},
        {title: '3', className: 'g2', src: "/assets/gallery/3.jpg", tags: [""]},
      ]
    },
  ];

  private _keydownBinding: KeyboardBinding;

  constructor(private _modalService: ModalService, private _animationCount: AnimationCountService) {
    this._animationCount.specifyAnimations(PAGE_ANIMATIONS);
    this.updateSection(SECTIONS.one);
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

  updateSection(section: number) {
    this.section = section;
    const entries = this.photos.find(e => e.section == section)
    this._photoResults = entries ? entries.photos : [];
  }

  updateCriteria(criteria: string) {
    criteria = criteria ? criteria.trim() : '';
    this._criteria = criteria;
    this.updateSection(this.section);
    const newTotal = filterPhotos(this._photoResults, criteria).length;
    if (this.filterTotal != newTotal) {
      this.filterTotal = newTotal;
    } else if (!criteria) {
      this.filterTotal = -1;
    }
  }

  getPhotos() {
    return this._photoResults
  }

  isActive(section: number) {
    return section == this.section;
  }

  isPhotoActive(photo: any) {
    return PHOTO_FILTER.isPhotoActive(photo, this._criteria);
  }
}
