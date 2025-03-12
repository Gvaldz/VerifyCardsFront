import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagoModule } from './pago/pago.module';
import { HttpClientModule } from '@angular/common/http';
import { CardRepository } from './pago/domain/repository';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    PagoModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
