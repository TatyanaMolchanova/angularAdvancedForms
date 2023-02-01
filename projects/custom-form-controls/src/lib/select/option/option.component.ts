import { Highlightable } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'cfc-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionComponent<T> implements OnInit, Highlightable {

  @Input()
  value: T | null = null;

  @Input()
  disabledReason = '';

  @Input()
  @HostBinding('class.disabled')
  disabled = false;

  @Output()
  selected = new EventEmitter<OptionComponent<T>>();

  @HostListener('click')
  protected select() {
    if (!this.disabled) {
      this.highlightAsSelected();
      this.selected.emit(this);
    }
  }
  @HostBinding('class.selected')
  protected isSelected = false;

  @HostBinding('class.active')
  protected isActive = false;

  constructor(private cd: ChangeDetectorRef, private el: ElementRef<HTMLElement>) { }

  setActiveStyles(): void {
    this.isActive = true;
    this.cd.markForCheck();
  }
  setInactiveStyles(): void {
    this.isActive = false;
    this.cd.markForCheck();
  }

  scrollIntoView(options?: ScrollIntoViewOptions) {
    this.el.nativeElement.scrollIntoView(options);
  }

  ngOnInit(): void {
  }

  highlightAsSelected() {
    this.isSelected = true;
    this.cd.markForCheck();
  }

  deselect() {
    this.isSelected = false;
    this.cd.markForCheck();
  }

}
