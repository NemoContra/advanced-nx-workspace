import { createDirectiveFactory } from '@ngneat/spectator/jest';

import { SharedUiAnimalSoundButtonDirective } from './shared-ui-animal-sound-button.directive';
import { playSound } from './common/play-sound';

jest.mock('./common/play-sound', () => {
  const { of } = jest.requireActual('rxjs');
  return {
    playSound: jest.fn().mockReturnValue(of(undefined)),
  };
});

describe('SharedUiAnimalSoundButtonDirective ', () => {
  const createDirective = createDirectiveFactory(
    SharedUiAnimalSoundButtonDirective
  );

  describe.each([
    { animal: 'cat', sound: 'cat_purr_close' },
    { animal: 'dog', sound: 'dog_barking' },
  ])('$animal', ({ animal, sound }) => {
    afterEach(() => jest.resetAllMocks());

    it(`should play the audio ${sound}`, () => {
      const spectator = createDirective(
        `<button [flightWorkspaceSharedUiAnimalSoundButton]="animal">Click me!</button>`,
        {
          hostProps: { animal },
        }
      );

      expect(spectator.fixture).toMatchSnapshot();
      expect(playSound).not.toHaveBeenCalled();

      spectator.click('button');

      expect(playSound).toHaveBeenCalledTimes(1);
      expect(playSound).toHaveBeenCalledWith(
        `https://actions.google.com/sounds/v1/animals/${sound}.ogg`
      );
    });
  });
});
