import {Directive, HostBinding, HostListener, Output, EventEmitter} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appDragAndDrop]'
})
export class DragAndDropDirective {
  @HostBinding('class.fileover') fileOver: boolean = false;
  @Output() fileDropped = new EventEmitter<any>();

  // Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = true;
  }

  // Dragleave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
  }

  // Drop listener
  @HostListener('drop', ['$event']) public ondrop(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
    let file = evt.dataTransfer.files;
    if (file.length > 0) {
      this.fileDropped.emit(file);
    }
  }
}
