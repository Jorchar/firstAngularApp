import {Component, ViewChild} from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { RouterModule } from "@angular/router";
import {LoadingIndicatorComponent} from "./loading-indicator/loading-indicator.component";
import {MatDrawerContainer, MatDrawerContent, MatDrawer} from "@angular/material/sidenav";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [HomeComponent, RouterModule, LoadingIndicatorComponent, MatDrawerContainer, MatDrawer, MatDrawerContent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "WateringPlantApp";
  @ViewChild('searchInput') searchInput: any;

  onUserIconClick() {
    console.log("clicked");
  }

  onShortSearchClick() {
    this.searchInput.nativeElement.focus();
    console.log("tak");
  }

  onShortSearchBackClick() {
    this.searchInput.nativeElement.focusout();
  }
}
