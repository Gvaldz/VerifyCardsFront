import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { PedidoRepository } from '../domain/repository';
import { IPedido } from '../domain/IUpedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private pedidoSubject = new BehaviorSubject<IPedido | null>(null);
  pedido$ = this.pedidoSubject.asObservable();

  constructor(private pedidoRepository: PedidoRepository) { }

  checkPedidoStatus(orderId: number): Observable<IPedido> {
    return this.pedidoRepository.getPedidoStatus(orderId);
  }
}