import { Component } from '@angular/core';
import { Observable } from "rxjs";
import { Dog, DogService } from "./dog.service";

@Component({
  selector: 'app-root',
  template: `<img *ngIf="doggo$ | async as doggo" [src]="doggo.message">`,
})
export class AppComponent {
  title = "http-mock";
  doggo$: Observable<Dog>;

  constructor(private dogService: DogService) {
    this.doggo$ = dogService.randomDog()
    console.log(this.doggo$)
  }

}
