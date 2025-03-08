import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { IUdatos } from '../domain/iudatos';
import { CardRepository } from '../domain/repository';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private cardSubject = new BehaviorSubject<IUdatos  | null>(null)
  card$ = this.cardSubject.asObservable();

  constructor(private cardRepository: CardRepository) { }

  sendCard(card: IUdatos): Observable<IUdatos> {
    return this.cardRepository.create(card);
  }
}