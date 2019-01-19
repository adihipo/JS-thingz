import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NameComponent } from './name/name.component';
import { DetailComponent } from './detail/detail.component';
import { PandaService } from './panda.service';
import { RoutingModule } from './routing.module';
import { TutorialComponent } from './tutorial/tutorial.component';

@NgModule({
  declarations: [
    AppComponent,
    NameComponent,
    DetailComponent,
    TutorialComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RoutingModule
  ],
  providers: [PandaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
