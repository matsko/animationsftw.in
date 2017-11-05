import { Input, Component, ElementRef } from '@angular/core';
import { AnimationBuilder, NoopAnimationPlayer, AnimationPlayer, query, style, animate, stagger } from '@angular/animations';

@Component({
  selector: 'app-photo-scrubber',
  templateUrl: './photo-scrubber.component.html',
  styleUrls: ['./photo-scrubber.component.scss']
})
export class PhotoScrubberComponent {
  public paused = false;
  public done = false;

  @Input('position')
  set position(pos: number) {
    this.pause();
    this.player.setPosition(pos / 100);
  }

  private _photos: string[] = [];

  get photos() { return this._photos; }

  @Input('photos')
  set photos(photos: string[]) {
    this._photos = photos;

    // this is to ensure the animation starts after the photos are loaded
    Promise.resolve(true).then(() => {
      this.start();
      this.play();
    });
  }

  public player: AnimationPlayer = new NoopAnimationPlayer();

  constructor(private _builder: AnimationBuilder, private _element: ElementRef) {}

  private _buildAnimation() {
    return this._builder.build([
      query('.photo-record', [
        style({ opacity: 0, transform: 'translateY(-50px)' }),
        stagger(100, [
          animate('500ms', style({ opacity: 1, transform: 'none' }))
        ])
      ])
    ]);
  }

  private _buildPlayer() {
    const animation = this._buildAnimation();
    return animation.create(this._element.nativeElement);
  }

  play() {
    this.paused = false;
    this.player.play();
  }

  pause() {
    this.paused = true;
    this.player.pause();
  }

  toggle() {
    this.paused ? this.play() : this.pause();
  }

  get playing() {
    return this.paused == false && this.done == false;
  }

  start() {
    this.player = this._buildPlayer();
    this.player.onStart(() => {
      this.done = false;
    });
    this.player.onDone(() => {
      this.done = true;
    })
  }
}
