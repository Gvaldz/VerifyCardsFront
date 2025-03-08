import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CardRepositoryImpl } from '../../infrastructure/services';
import { IUdatos } from '../../domain/iudatos';
import { PedidoService } from '../../../pedidos/infrastructure/pedido.service';

@Component({
  selector: 'app-pago-card',
  templateUrl: './pago-card.component.html',
  styleUrls: ['./pago-card.component.css']
})
export class PagoCardComponent {
  tarjetaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private pagoService: CardRepositoryImpl,
    private pedidoService: PedidoService
  ) {
    this.tarjetaForm = this.fb.group({
      numeroTarjeta: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      nombreTitular: ['', Validators.required],
      fechaExpiracion: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])/[0-9]{2}$')]],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]]
    });
  }

  onSubmit() {
    if (this.tarjetaForm.valid) {
      const cardData: IUdatos = {
        Number: this.tarjetaForm.value.numeroTarjeta,
        Name: this.tarjetaForm.value.nombreTitular,
        Expiry: this.tarjetaForm.value.fechaExpiracion,
        CVV: this.tarjetaForm.value.cvv
      };

      this.pagoService.sendCard(cardData).subscribe({
        next: (response) => {
            console.log('Tarjeta enviada con éxito', response);
            alert('Pago realizado correctamente. Verificando estado del pedido...');
    
            const orderId = response.orderId;
    
            this.pedidoService.checkPedidoStatus(orderId).subscribe({
                next: (pedido) => {
                    alert(`Pedido creado con ID: ${pedido.id}`);
                },
                error: (err) => {
                    console.error('Error al verificar el estado del pedido:', err);
                    alert('Hubo un error al verificar el estado del pedido.');
                }
            });
        },
        error: (error) => {
            console.error('Error al enviar los datos', error);
            alert('Hubo un error al procesar el pago');
        }
    });
    }
  }
}