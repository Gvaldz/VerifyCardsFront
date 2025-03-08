import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPedido } from '../domain/IUpedido';
import { PedidoRepository } from '../domain/repository';

@Injectable({ providedIn: 'root' })
export class PedidoRepositoryImpl implements PedidoRepository {
  private apiUrl = 'http://localhost:8081/orders/status'; 

  constructor(private http: HttpClient) {}

  getPedidoStatus(orderId: number): Observable<IPedido> {
    return this.http.get<IPedido>(`${this.apiUrl}?id=${orderId}`);
  }
}