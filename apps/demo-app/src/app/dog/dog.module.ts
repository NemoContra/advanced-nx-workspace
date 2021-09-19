import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DogComponent } from './dog.component';
import { SharedUtilRandomAnimalImageModule } from '@flight-workspace/shared/util/random-animal-image';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [DogComponent],
  imports: [
    CommonModule,
    SharedUtilRandomAnimalImageModule.forChild({ cats: false, dogs: true }),
    RouterModule.forChild([
      {
        path: '',
        component: DogComponent,
      },
    ]),
  ],
})
export class DogModule {}
