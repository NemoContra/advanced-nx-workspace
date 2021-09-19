import * as Module from './shared-util-random-animal-image.module';
import { SharedUtilRandomAnimalImageModule } from './shared-util-random-animal-image.module';
import { createServiceFactory } from '@ngneat/spectator/jest';
import {
  ANIMAL_IMAGE_CONFIG,
  AnimalImageConfig,
  SharedUtilRandomAnimalImageService,
} from '@flight-workspace/shared/util/random-animal-image';

jest.spyOn(Module, 'configFactory');

console.log = jest.fn();

describe('SharedUtilRandomAnimalImageModule', () => {
  describe.each([
    ['forRoot', { cats: true, dogs: true }],
    ['forRoot', { cats: true, dogs: false }],
    ['forRoot', { cats: false, dogs: true }],
    ['forRoot', { cats: false, dogs: false }],
    ['forChild', { cats: true, dogs: true }],
    ['forChild', { cats: true, dogs: false }],
    ['forChild', { cats: false, dogs: true }],
    ['forChild', { cats: false, dogs: false }],
  ] as const)(
    'call %s with %j',
    (registerFn: 'forRoot' | 'forChild', config: AnimalImageConfig) => {
      const createService = createServiceFactory({
        service: SharedUtilRandomAnimalImageService,
        imports: [SharedUtilRandomAnimalImageModule[registerFn](config)],
      });

      it('should register', () => {
        const spectator = createService();
        expect(spectator.inject(ANIMAL_IMAGE_CONFIG)).toMatchSnapshot('config');
        expect(Module.configFactory).toHaveBeenCalledWith(config);
      });
    }
  );

  test('configFactory', () => expect(Module.configFactory).toMatchSnapshot());
});
