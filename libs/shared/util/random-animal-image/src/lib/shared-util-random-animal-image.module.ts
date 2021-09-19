import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedUtilRandomAnimalImageComponent } from './shared-util-random-animal-image.component';
import { SharedUtilRandomAnimalImageService } from './shared-util-random-animal-image.service';
import { HttpClientModule } from '@angular/common/http';
import {
  ANIMAL_IMAGE_CONFIG,
  AnimalImageConfig,
  defaultAnimalImageConfig,
} from './common/animal-image-config';

export const configFactory =
  ({
    cats,
    dogs,
  }: Partial<AnimalImageConfig> = defaultAnimalImageConfig): (() => AnimalImageConfig) =>
  () => ({
    cats:
      cats === undefined || cats === null
        ? defaultAnimalImageConfig.cats
        : cats,
    dogs:
      dogs === undefined || dogs === null
        ? defaultAnimalImageConfig.dogs
        : dogs,
  });

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [SharedUtilRandomAnimalImageComponent],
  exports: [SharedUtilRandomAnimalImageComponent],
  providers: [],
})
export class SharedUtilRandomAnimalImageModule {
  static forRoot(
    config?: Partial<AnimalImageConfig>
  ): ModuleWithProviders<SharedUtilRandomAnimalImageModule> {
    return {
      ngModule: SharedUtilRandomAnimalImageModule,
      providers: [
        SharedUtilRandomAnimalImageService,
        { provide: ANIMAL_IMAGE_CONFIG, useFactory: configFactory(config) },
      ],
    };
  }

  static forChild(
    config?: Partial<AnimalImageConfig>
  ): ModuleWithProviders<SharedUtilRandomAnimalImageModule> {
    return {
      ngModule: SharedUtilRandomAnimalImageModule,
      providers: [
        SharedUtilRandomAnimalImageService,
        { provide: ANIMAL_IMAGE_CONFIG, useFactory: configFactory(config) },
      ],
    };
  }
}
