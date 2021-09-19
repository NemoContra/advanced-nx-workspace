import {
  ANIMAL_IMAGE_CONFIG,
  AnimalImage,
  AnimalImageConfig,
  CatImage,
  DogImage,
  SharedUtilRandomAnimalImageService,
} from '@flight-workspace/shared/util/random-animal-image';
import {
  createHttpFactory,
  HttpMethod,
  SpectatorHttp,
} from '@ngneat/spectator/jest';
import { Observer } from 'rxjs';
import { mocked } from 'ts-jest/utils';
import { getRandomEntry } from './common/random-from-array';
import { TestRequest } from '@angular/common/http/testing';
import { HttpStatusCode } from '@angular/common/http';

jest.mock('./common/random-from-array', () => ({
  getRandomEntry: jest.fn(),
}));

console.log = jest.fn();

describe('SharedUtilRandomAnimalImageService', () => {
  const createService = createHttpFactory({
    service: SharedUtilRandomAnimalImageService,
  });

  const catImage: CatImage = {
    file: 'https://cat.de/test.png',
  };
  const dogImage: DogImage = {
    status: 'success',
    message: 'https://dog.de/test.png',
  };

  describe.each`
    cats     | dogs     | url                                          | body
    ${true}  | ${true}  | ${'https://aws.random.cat/meow'}             | ${catImage}
    ${true}  | ${false} | ${'https://aws.random.cat/meow'}             | ${catImage}
    ${false} | ${true}  | ${'https://dog.ceo/api/breeds/image/random'} | ${dogImage}
  `('With config cats: $cats and dogs: $dogs', ({ cats, dogs, url, body }) => {
    let spectator: SpectatorHttp<SharedUtilRandomAnimalImageService>;

    beforeEach(() => {
      spectator = createService({
        providers: [
          {
            provide: ANIMAL_IMAGE_CONFIG,
            useValue: { cats, dogs } as AnimalImageConfig,
          },
        ],
      });
    });

    afterEach(() => jest.resetAllMocks());

    it('should get the result successfully', () => {
      const spyObserver: Observer<AnimalImage> = {
        next: jest.fn().mockName('next'),
        error: jest.fn().mockName('error'),
        complete: jest.fn().mockName('complete'),
      };

      const randomEntryMock = mocked(getRandomEntry);

      randomEntryMock.mockImplementation((arr) => arr[0]);

      spectator.service.getAnimalImage().subscribe(spyObserver);

      const testRequest: TestRequest = spectator.expectOne(url, HttpMethod.GET);

      testRequest.flush(body);

      expect(randomEntryMock).toHaveBeenCalledTimes(1);
      expect(randomEntryMock).toHaveBeenCalledWith(expect.any(Array));
      expect(spyObserver).toMatchSnapshot('spyObserver');
    });

    it('should throw an error', () => {
      const spyObserver: Observer<AnimalImage> = {
        next: jest.fn().mockName('next'),
        error: jest.fn().mockName('error'),
        complete: jest.fn().mockName('complete'),
      };

      const randomEntryMock = mocked(getRandomEntry);

      randomEntryMock.mockImplementation((arr) => arr[0]);

      spectator.service.getAnimalImage().subscribe(spyObserver);

      const testRequest: TestRequest = spectator.expectOne(url, HttpMethod.GET);

      testRequest.flush(body, {
        status: HttpStatusCode.InternalServerError,
        statusText: 'Internal Server Error',
      });

      expect(randomEntryMock).toHaveBeenCalledTimes(1);
      expect(randomEntryMock).toHaveBeenCalledWith(expect.any(Array));
      expect(spyObserver).toMatchSnapshot('spyObserver');
    });
  });

  test('With config cats: false and dogs: false', () => {
    const spectator: SpectatorHttp<SharedUtilRandomAnimalImageService> =
      createService({
        providers: [
          {
            provide: ANIMAL_IMAGE_CONFIG,
            useValue: { cats: false, dogs: false } as AnimalImageConfig,
          },
        ],
      });

    const spyObserver: Observer<AnimalImage> = {
      next: jest.fn().mockName('next'),
      error: jest.fn().mockName('error'),
      complete: jest.fn().mockName('complete'),
    };

    const randomEntryMock = mocked(getRandomEntry);

    randomEntryMock.mockImplementation((arr) => arr[0]);

    spectator.service.getAnimalImage().subscribe(spyObserver);

    spectator.controller.expectNone('https://aws.random.cat/meow');
    spectator.controller.expectNone('https://dog.ceo/api/breeds/image/random');

    expect(randomEntryMock).toHaveBeenCalledTimes(1);
    expect(randomEntryMock).toHaveBeenCalledWith(expect.any(Array));
    expect(spyObserver).toMatchSnapshot('spyObserver');
  });
});
