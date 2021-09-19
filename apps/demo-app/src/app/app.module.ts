import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SharedUtilRandomAnimalImageModule } from '@flight-workspace/shared/util/random-animal-image';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SharedUtilRandomAnimalImageModule.forRoot({ cats: true, dogs: true }),
    RouterModule.forRoot([
      {
        path: '',
        loadChildren: () =>
          import('./animal/animal.module').then((m) => m.AnimalModule),
      },
      {
        path: 'cat',
        loadChildren: () => import('./cat/cat.module').then((m) => m.CatModule),
      },
      {
        path: 'dog',
        loadChildren: () => import('./dog/dog.module').then((m) => m.DogModule),
      },
      {
        path: '',
        component: AppComponent,
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
