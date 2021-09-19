import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimalComponent } from './animal.component';
import { SharedUtilRandomAnimalImageModule } from '@flight-workspace/shared/util/random-animal-image';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AnimalComponent],
  imports: [
    CommonModule,
    SharedUtilRandomAnimalImageModule,
    RouterModule.forChild([
      {
        path: '',
        component: AnimalComponent,
      },
    ]),
  ],
  exports: [AnimalComponent],
})
export class AnimalModule {}
