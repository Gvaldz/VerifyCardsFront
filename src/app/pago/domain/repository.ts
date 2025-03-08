import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUdatos } from './iudatos';

@Injectable({ providedIn: 'root' })
export abstract class CardRepository {
  abstract create(card: IUdatos): Observable<IUdatos>;
}
