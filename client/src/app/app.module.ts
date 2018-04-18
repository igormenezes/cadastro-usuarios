import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routing } from './app.routing';

import { AppComponent } from './app.component';
import { FormModule } from './form/form.module';

import { HttpRequestService } from './service/http-request.service';
import { ValidatorFormService } from './service/validator-form.service';
import { ShowComponent } from './user/show/show.component';

@NgModule({
  declarations: [
    AppComponent,
    ShowComponent
  ],
  imports: [
    BrowserModule,
    Routing,
    FormModule
  ],
  providers: [HttpRequestService, ValidatorFormService],
  bootstrap: [AppComponent]
})

export class AppModule { }
