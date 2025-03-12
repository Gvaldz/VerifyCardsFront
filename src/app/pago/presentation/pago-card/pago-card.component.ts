import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PagoService } from '../../infrastructure/services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pago-card',
  templateUrl: './pago-card.component.html',
  styleUrls: ['./pago-card.component.css'],
})
export class PagoCardComponent {
  tarjetaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private pagoService: PagoService
  ) {
    this.tarjetaForm = this.fb.group({
      numeroTarjeta: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      nombreTitular: ['', Validators.required],
      fechaExpiracion: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])/[0-9]{2}$')]],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
    });
  }

  onSubmit() {
    if (this.tarjetaForm.valid) {
      const cardData = {
        Number: this.tarjetaForm.value.numeroTarjeta,
        Name: this.tarjetaForm.value.nombreTitular,
        Expiry: this.tarjetaForm.value.fechaExpiracion,
        CVV: this.tarjetaForm.value.cvv,
      };

      this.pagoService.sendCard(cardData).subscribe({
        next: () => {
          this.startLongPolling();
        },
        error: (error) => {
          console.error('Error al enviar la tarjeta:', error);
        },
      });
    } else {
      alert('Por favor, completa correctamente el formulario.');
    }
  }

  startLongPolling() {
    this.pagoService.pollForMessage().subscribe({
      next: (messageResponse) => {
        if (messageResponse && messageResponse.Content) {
          if (messageResponse.Content === 'Datos correctos, compra realizada.') {
            Swal.fire({
              icon: 'success',
              title: 'Pago aprobado',
              text: messageResponse.Content,
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Pago rechazado',
              text: messageResponse.Content,
            });
          }
        } else {
          this.startLongPolling();
        }
      },
      error: (error) => {
        console.error('Error en el long polling:', error);
      },
    });
  }
}