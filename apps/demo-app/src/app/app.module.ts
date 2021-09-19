import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SharedUtilRandomAnimalImageModule } from '@flight-workspace/shared/util/random-animal-image';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SharedUtilRandomAnimalImageModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
