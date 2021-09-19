import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatComponent } from './cat.component';
import { SharedUtilRandomAnimalImageModule } from '@flight-workspace/shared/util/random-animal-image';
import { RouterModule } from '@angular/router';
import { SharedUiAnimalSoundButtonModule } from '@flight-workspace/shared/ui/animal-sound-button';

@NgModule({
  declarations: [CatComponent],
  imports: [
    CommonModule,
    SharedUtilRandomAnimalImageModule.forChild({ cats: true, dogs: false }),
    RouterModule.forChild([
      {
        path: '',
        component: CatComponent,
      },
    ]),
    SharedUiAnimalSoundButtonModule,
  ],
  exports: [CatComponent],
})
export class CatModule {}
