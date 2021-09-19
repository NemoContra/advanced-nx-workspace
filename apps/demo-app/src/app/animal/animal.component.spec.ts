import { createRoutingFactory } from '@ngneat/spectator/jest';
import { AnimalComponent } from './animal.component';
import { MockModule } from 'ng-mocks';
import { SharedUtilRandomAnimalImageModule } from '@flight-workspace/shared/util/random-animal-image';

describe('AnimalComponent', () => {
  const createComponent = createRoutingFactory({
    component: AnimalComponent,
    routes: [
      {
        path: '',
        component: AnimalComponent,
      },
    ],
    imports: [MockModule(SharedUtilRandomAnimalImageModule)],
  });

  it('should render', () => {
    const spectator = createComponent();
    expect(spectator.fixture).toMatchSnapshot();
  });
});
