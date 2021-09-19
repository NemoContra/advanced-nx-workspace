import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AnimalImage, CatImage, DogImage } from './common/animal-image';
import { HttpClient } from '@angular/common/http';
import { getRandomEntry } from './common/random-from-array';

@Injectable()
export class SharedUtilRandomAnimalImageService {
  constructor(private httpClient: HttpClient) {}

  getAnimalImage(): Observable<AnimalImage> {
    return this.getRandomAnimalImage(true, true);
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
