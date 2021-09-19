import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedUtilRandomAnimalImageComponent } from './shared-util-random-animal-image.component';
import { SharedUtilRandomAnimalImageService } from './shared-util-random-animal-image.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [SharedUtilRandomAnimalImageComponent],
  exports: [SharedUtilRandomAnimalImageComponent],
  providers: [SharedUtilRandomAnimalImageService],
})
export class SharedUtilRandomAnimalImageModule {}
