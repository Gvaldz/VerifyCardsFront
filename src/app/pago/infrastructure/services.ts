import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUdatos } from '../domain/iudatos';
import { CardRepository } from '../domain/repository';

@Injectable({ providedIn: 'root' })

export class CardRepositoryImpl implements CardRepository {
  private apiUrl = 'http://44.209.171.255:8080/cards/validate'; 

  constructor(private http: HttpClient) {}

  sendCard(card: IUdatos): Observable<IUdatos> {
    return this.http.post<IUdatos>(this.apiUrl, card);
  }

  create(card: IUdatos): Observable<IUdatos> {
    return this.http.post<IUdatos>(this.apiUrl, card);
  }
}