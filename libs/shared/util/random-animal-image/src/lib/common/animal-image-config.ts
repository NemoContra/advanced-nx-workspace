import { InjectionToken } from '@angular/core';

export interface AnimalImageConfig {
  cats: boolean;
  dogs: boolean;
}

export const defaultAnimalImageConfig: AnimalImageConfig = {
  cats: true,
  dogs: true,
};

export const ANIMAL_IMAGE_CONFIG = new InjectionToken<AnimalImageConfig>(
  'ANIMAL_IMAGE_CONFIG'
);
