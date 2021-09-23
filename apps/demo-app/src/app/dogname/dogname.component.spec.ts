import { DognameComponent } from './dogname.component';
import { createHostFactory } from '@ngneat/spectator/jest';

describe('DognameComponent', () => {
  const createComponent = createHostFactory(DognameComponent);

  it.each`
    dogName      | greeting
    ${'Fido'}    | ${'Wuff wuff'}
    ${'Bello'}   | ${undefined}
    ${'Luna'}    | ${'Raaaaff'}
    ${null}      | ${null}
    ${undefined} | ${'Hey'}
  `(
    'dogname should be $dogname with greeting $greeting',
    ({ dogName, greeting }) => {
      const spectator = createComponent(
        '<flight-workspace-dogname [dogName]="dogName" [greeting]="greeting"></flight-workspace-dogname>',
        {
          hostProps: {
            dogName,
            greeting,
          },
        }
      );
      expect(spectator.fixture).toMatchSnapshot();
    }
  );
});
