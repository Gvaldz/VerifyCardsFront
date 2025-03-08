import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagosDashboardComponent } from './presentation/pagos-dashboard/pagos-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PagoCardComponent } from './presentation/pago-card/pago-card.component';



@NgModule({
  declarations: [
    PagosDashboardComponent,
    PagoCardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    PagosDashboardComponent
  ]
})
export class PagoModule { }
