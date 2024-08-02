import {Component, inject} from '@angular/core';
import {DragAndDropDirective} from "../drag-and-drop.directive";
import {NgIf} from "@angular/common";
import {GlobalErrorHandlerService} from "../global-error-handler.service";

@Component({
  selector: 'app-plant-add',
  standalone: true,
  imports: [
    DragAndDropDirective,
    NgIf
  ],
  templateUrl: './plant-add.component.html',
  styleUrl: './plant-add.component.scss'
})
export class PlantAddComponent {
  globalErrorHandler: GlobalErrorHandlerService = inject(GlobalErrorHandlerService);
  image: any;

  onImageDropped(file: FileList) {
    this.prepareImage(file);
  }

  imageBrowsedHandler($event: any) {
    this.prepareImage($event.target.files);
  }

  private prepareImage(files: FileList) {
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      this.image = reader.result as string;
    };
    reader.onerror = () => {
      this.globalErrorHandler.errorHandle("Could not load image");
    }
  }
}
