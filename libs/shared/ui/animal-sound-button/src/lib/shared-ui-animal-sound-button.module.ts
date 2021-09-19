import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedUiAnimalSoundButtonDirective } from './shared-ui-animal-sound-button.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [SharedUiAnimalSoundButtonDirective],
  exports: [SharedUiAnimalSoundButtonDirective],
})
export class SharedUiAnimalSoundButtonModule {}
