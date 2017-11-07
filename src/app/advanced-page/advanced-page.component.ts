import { HostBinding, Component } from '@angular/core';
import { trigger, transition, animate, style, query, stagger } from '@angular/animations';
import { ModalService } from '../modal.service';
import { KeyboardBinding, Keys } from '../keyboard.service';
import { AnimationCountService } from '../animation-count.service';
import { PhotoPipe } from '../photo.pipe';
import PHOTOS from '../photos';

const SECTIONS = {
  one: 1,
  two: 2,
  three: 3
};

const PAGE_ANIMATIONS = [
  {title: 'Page Animation', fileName: '/assets/code/a1-page.example-ts'},
  {title: 'Gallery One Animation', fileName: '/assets/code/a1-g1.example-ts'},
  {title: 'Gallery Two Animation', fileName: '/assets/code/a1-g2.example-ts'},
  {title: 'Gallery Three Animation', fileName: '/assets/code/a1-g3.example-ts'},
  {title: 'Filter Animation', fileName: '/assets/code/a1-filter.example-ts'},
];

const sectionedPhotos: any[] = [
  PHOTOS.slice(0, 20),
  PHOTOS.slice(20, 40),
  PHOTOS.slice(40, 60)
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
      transition(':enter, * => 0, * => -1', []),
      transition(':increment', [
        query(':enter', [
          style({ opacity: 0, width: '0px' }),
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 1, width: '*' })),
          ]),
        ])
      ]),
      transition(':decrement', [
        query(':leave', [
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 0, width: '0px' })),
          ]),
        ])
      ]),
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

  private _photoResults: any[] = [];
  public filterTotal = -1;

  photos: any[] = [
    { section: SECTIONS.one,
      photos: sectionedPhotos[0]
    },
    { section: SECTIONS.two,
      photos: sectionedPhotos[1]
    },
    { section: SECTIONS.three,
      photos: sectionedPhotos[2]
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
    this.updateSection(Math.max(this.section - 1, 1));
  }

  down() {
    this.updateSection(Math.min(this.section + 1, Object.keys(SECTIONS).length));
  }

  updateSection(section: number) {
    this.section = section;
    const entries = this.photos.find(e => e.section == section)
    this._photoResults = entries ? entries.photos : [];
  }

  updateCriteria(criteria: string) {
    criteria = criteria ? criteria.trim() : '';
    this.updateSection(this.section);
    this._photoResults = filterPhotos(this._photoResults, criteria);
    const newTotal = this._photoResults.length;
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
}
