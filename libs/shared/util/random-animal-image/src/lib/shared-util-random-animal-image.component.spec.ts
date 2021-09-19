import {
  AnimalImage,
  SharedUtilRandomAnimalImageComponent,
  SharedUtilRandomAnimalImageService,
} from '@flight-workspace/shared/util/random-animal-image';
import { createComponentFactory, mockProvider } from '@ngneat/spectator/jest';
import { of } from 'rxjs';

describe('SharedUtilRandomAnimalImageComponent', () => {
  const createComponent = createComponentFactory({
    component: SharedUtilRandomAnimalImageComponent,
    providers: [
      mockProvider(SharedUtilRandomAnimalImageService, {
        getAnimalImage: jest
          .fn()
          .mockReturnValue(
            of({
              src: 'http://someimage.com/someimage.png',
              alt: 'TEST',
            } as AnimalImage)
          ),
      }),
    ],
  });

  it('should render an image with src and alt', () => {
    const spectator = createComponent();
    expect(spectator.fixture).toMatchSnapshot();
  });
});
