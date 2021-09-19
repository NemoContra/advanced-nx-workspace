import { Inject, Injectable } from '@angular/core';
import { map, NEVER, Observable } from 'rxjs';
import { AnimalImage, CatImage, DogImage } from './common/animal-image';
import { HttpClient } from '@angular/common/http';
import { getRandomEntry } from './common/random-from-array';
import {
  ANIMAL_IMAGE_CONFIG,
  AnimalImageConfig,
} from './common/animal-image-config';

@Injectable()
export class SharedUtilRandomAnimalImageService {
  private imageFactories: (() => Observable<AnimalImage>)[] = [
    ...(this.animalImageConfig.cats ? [this.getCatImage.bind(this)] : []),
    ...(this.animalImageConfig.dogs ? [this.getDogImage.bind(this)] : []),
  ];

  constructor(
    private httpClient: HttpClient,
    @Inject(ANIMAL_IMAGE_CONFIG) private animalImageConfig: AnimalImageConfig
  ) {
    console.log(
      'SharedUtilRandomAnimalImageService loaded',
      this.animalImageConfig
    );
  }

  getAnimalImage(): Observable<AnimalImage> {
    return getRandomEntry(this.imageFactories)?.() ?? NEVER;
  }

  private getCatImage(): Observable<AnimalImage> {
    return this.httpClient.get<CatImage>('https://aws.random.cat/meow').pipe(
      map(
        ({ file }: CatImage): AnimalImage => ({
          src: file,
          alt: 'A cat',
        })
      )
    );
  }

  private getDogImage(): Observable<AnimalImage> {
    return this.httpClient
      .get<DogImage>('https://dog.ceo/api/breeds/image/random')
      .pipe(
        map(
          ({ message }: DogImage): AnimalImage => ({
            src: message,
            alt: 'A Dog',
          })
        )
      );
  }
}
