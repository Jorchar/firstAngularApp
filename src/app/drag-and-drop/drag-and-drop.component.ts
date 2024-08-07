import {Component, EventEmitter, Output} from '@angular/core';
import {DragAndDropDirective} from "../drag-and-drop.directive";

@Component({
  selector: 'app-drag-and-drop',
  standalone: true,
  imports: [
    DragAndDropDirective
  ],
  templateUrl: './drag-and-drop.component.html',
  styleUrl: './drag-and-drop.component.scss'
})
export class DragAndDropComponent {

  @Output() onImagePrepared: EventEmitter<FileList> = new EventEmitter();

  onImageDropped(file: FileList) {
    this.onImagePrepared.emit(file);
  }
  imageBrowsedHandler($event: any) {
    this.onImagePrepared.emit($event.target.files);
  }
}
