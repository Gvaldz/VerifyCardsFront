import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPedido } from './IUpedido';

@Injectable({ providedIn: 'root' })
export abstract class PedidoRepository {
  abstract getPedidoStatus(orderId: number): Observable<IPedido>;
}