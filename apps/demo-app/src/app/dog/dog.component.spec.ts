import { createRoutingFactory } from '@ngneat/spectator/jest';
import { DogComponent } from './dog.component';
import { MockModule } from 'ng-mocks';
import { SharedUtilRandomAnimalImageModule } from '@flight-workspace/shared/util/random-animal-image';

describe('DogComponent', () => {
  const createComponent = createRoutingFactory({
    component: DogComponent,
    routes: [
      {
        path: '',
        component: DogComponent,
      },
    ],
    imports: [MockModule(SharedUtilRandomAnimalImageModule)],
  });

  it('should render', () => {
    const spectator = createComponent();
    expect(spectator.fixture).toMatchSnapshot();
  });
});
