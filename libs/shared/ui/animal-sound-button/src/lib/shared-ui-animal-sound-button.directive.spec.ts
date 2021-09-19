import {
  createDirectiveFactory,
  SpectatorDirective,
} from '@ngneat/spectator/jest';

import { SharedUiAnimalSoundButtonDirective } from './shared-ui-animal-sound-button.directive';

describe('SharedUiAnimalSoundButtonDirective ', () => {
  let spectator: SpectatorDirective<SharedUiAnimalSoundButtonDirective>;
  const createDirective = createDirectiveFactory(
    SharedUiAnimalSoundButtonDirective
  );

  it('should change the background color', () => {
    spectator = createDirective(
      `<div highlight>Testing SharedUiAnimalSoundButtonDirective</div>`
    );

    spectator.dispatchMouseEvent(spectator.element, 'mouseover');

    expect(spectator.element).toHaveStyle({
      backgroundColor: 'rgba(0,0,0, 0.1)',
    });

    spectator.dispatchMouseEvent(spectator.element, 'mouseout');
    expect(spectator.element).toHaveStyle({
      backgroundColor: '#fff',
    });
  });
});
