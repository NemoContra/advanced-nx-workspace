import { createRoutingFactory } from '@ngneat/spectator/jest';
import { CatComponent } from './cat.component';
import { MockModule } from 'ng-mocks';
import { SharedUtilRandomAnimalImageModule } from '@flight-workspace/shared/util/random-animal-image';

describe('CatComponent', () => {
  const createComponent = createRoutingFactory({
    component: CatComponent,
    routes: [
      {
        path: '',
        component: CatComponent,
      },
    ],
    imports: [MockModule(SharedUtilRandomAnimalImageModule)],
  });

  it('should render', () => {
    const spectator = createComponent();
    expect(spectator.fixture).toMatchSnapshot();
  });
});
