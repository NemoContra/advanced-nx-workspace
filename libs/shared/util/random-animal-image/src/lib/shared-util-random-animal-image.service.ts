import { Inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AnimalImage, CatImage, DogImage } from './common/animal-image';
import { HttpClient } from '@angular/common/http';
import { getRandomEntry } from './common/random-from-array';
import {
  ANIMAL_IMAGE_CONFIG,
  AnimalImageConfig,
} from './common/animal-image-config';

@Injectable()
export class SharedUtilRandomAnimalImageService {
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
    return this.getRandomAnimalImage(
      this.animalImageConfig.cats,
      this.animalImageConfig.dogs
    );
  }

  private getRandomAnimalImage(
    enableCats: boolean,
    enableDogs: boolean
  ): Observable<AnimalImage> {
    const imageFactories: Observable<AnimalImage>[] = [
      ...(enableCats ? [this.getCatImage()] : []),
      ...(enableDogs ? [this.getDogImage()] : []),
    ];

    return getRandomEntry(imageFactories);
  }

  private getDogImage(): Observable<AnimalImage> {
    return this.httpClient
      .get<DogImage>('https://dog.ceo/api/breeds/image/random')
      .pipe(
        map(
          ({ message }) =>
            ({
              src: message,
              alt: 'A Dog',
            } as AnimalImage)
        )
      );
  }

  private getCatImage(): Observable<AnimalImage> {
    return this.httpClient.get<CatImage>('https://aws.random.cat/meow').pipe(
      map(
        ({ file }) =>
          ({
            src: file,
            alt: 'A cat',
          } as AnimalImage)
      )
    );
  }
}
