import { HostBinding, Component } from '@angular/core';
import { stagger, trigger, transition, style, state, query, group, animate } from '@angular/animations';
import { KeyboardBinding, Keys } from '../keyboard.service';
import { AnimationCountService } from '../animation-count.service';

const SECTIONS = {
  intro: 1,
  triggers: 2,
  component: 3,
  animateStyle: 4,
  insertionRemoval: 5,
  animationCallback: 6
};

const PAGE_ANIMATIONS = [
  {title: 'Page Animation', fileName: '/assets/code/basics-page-animation.example-ts'},
  {title: 'Photo Change Animation', fileName: '/assets/code/basics-page-content-animation.example-ts'}
];

const UP_ARROW_CODE = 38;
const DOWN_ARROW_CODE = 40;

@Component({
  selector: 'app-basics-page',
  templateUrl: './basics-page.component.html',
  styleUrls: ['./basics-page.component.scss'],
  animations: [
    trigger('pageAnimations', [
      transition(':enter', [
        query('.inner-section, .menu-area > li', [
          style({ transform: 'translateY(-100px)', opacity: 0 }),
          stagger(50, [
            animate('300ms ease-out', style({ transform: 'none', opacity: '*' }))
          ])
        ])
      ])
    ]),
    trigger('contentAnimation', [
      transition(':enter', []),

      state(`${SECTIONS.intro}`, style({ transform: 'translateY(0px)' })),
      state(`${SECTIONS.triggers}`, style({ transform: 'translateY(-700px)' })),
      state(`${SECTIONS.component}`, style({ transform: 'translateY(-1500px)' })),
      state(`${SECTIONS.animateStyle}`, style({ transform: 'translateY(-2300px)' })),
      state(`${SECTIONS.insertionRemoval}`, style({ transform: 'translateY(-3100px)' })),
      state(`${SECTIONS.animationCallback}`, style({ transform: 'translateY(-3700px)' })),

      transition('* => *', animate('500ms cubic-bezier(0.35, 0, 0.25, 1)'))
    ])
  ]
})
export class BasicsPageComponent {
  @HostBinding('@pageAnimations')
  public animatePage = true;

  section = SECTIONS.intro;
  visibleSection = SECTIONS.intro;

  sections = SECTIONS;

  private _keydownBinding: KeyboardBinding;

  constructor(private _animationCount: AnimationCountService) {
    this._animationCount.specifyAnimations(PAGE_ANIMATIONS);
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

  isActive(value: number) {
    return value === this.section;
  }

  onInnerSectionClick(value: number) {
    if (value != this.visibleSection) {
      this.section = value;
    }
  }
}
