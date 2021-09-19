import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AnimalImage } from './common/animal-image';
import { SharedUtilRandomAnimalImageService } from './shared-util-random-animal-image.service';

@Component({
  selector: 'flight-workspace-shared-util-random-animal-image',
  template: `<img
    *ngIf="img$ | async as img"
    [src]="img.src"
    [attr.alt]="img.alt"
    width="500px"
    height="500px"
  />`,
})
export class SharedUtilRandomAnimalImageComponent {
  img$: Observable<AnimalImage> = this.getAnimalImage();

  constructor(
    private sharedUtilRandomAnimalImageService: SharedUtilRandomAnimalImageService
  ) {}

  getAnimalImage(): Observable<AnimalImage> {
    return this.sharedUtilRandomAnimalImageService.getAnimalImage();
  }
}
