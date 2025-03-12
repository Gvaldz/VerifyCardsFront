import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class PagoService {
  private apiUrl = 'http://44.209.171.255:8080/cards/validate'; 
  private messageApiUrl = 'http://44.209.171.255:8081/messages';

  constructor(private http: HttpClient) {}

  sendCard(cardData: any): Observable<any> {
    return this.http.post(this.apiUrl, cardData).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error al enviar la tarjeta:', error);
        return throwError(error);
      })
    );
  }

  pollForMessage(): Observable<any> {
    return this.http.get(this.messageApiUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching messages:', error);
        Swal.fire('Error', 'Failed to fetch messages', 'error');
        return throwError(error);
      })
    );
  }
}