import {Component} from '@angular/core';
import {AsyncPipe, NgIf} from "@angular/common";
import {Observable} from "rxjs";
import {LoadingService} from "../loading.service";

@Component({
  selector: 'app-loading-indicator',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf
  ],
  templateUrl: './loading-indicator.component.html',
  styleUrl: './loading-indicator.component.scss'
})
export class LoadingIndicatorComponent {

  loading$: Observable<boolean>;

  constructor(
    private loadingService: LoadingService
  ) {
    this.loading$ = this.loadingService.loading$;
  }
}
