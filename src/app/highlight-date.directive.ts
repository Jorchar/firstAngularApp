import {
  Directive,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';
import {DomSanitizer, SafeStyle} from "@angular/platform-browser";

@Directive({
  selector: '[appHighlightDate]',
  standalone: true
})
export class HighlightDateDirective implements OnInit {
  @Input('cellDate') cellDate!: Date;
  @Input('displayedMonth') displayedMonth!: number;
  @HostBinding('style') style: SafeStyle = '';
  private currentDate = new Date();

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    if (this.cellDate.getMonth() != this.displayedMonth) {
      this.style = this.sanitizer.bypassSecurityTrustStyle('opacity: 0.3;')
    }
    if(this.cellDate.getDate() == this.currentDate.getDate() && this.cellDate.getMonth() == this.currentDate.getMonth() && this.cellDate.getFullYear() == this.currentDate.getFullYear()){
      this.style = this.sanitizer.bypassSecurityTrustStyle(
        'background: var(--primary-color-200);'
      );
    }
  }
}
