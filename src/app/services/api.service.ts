import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AiResponse } from '../models/ai-response.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = 'http://localhost:8080/api/ia';

  constructor(private http: HttpClient) {}

  // CREATE - Chat
  chat(prompt: string): Observable<AiResponse> {
    return this.http.post<AiResponse>(`${this.base}/chat`, { prompt });
  }

  // CREATE - Translate
  translate(prompt: string, source: string, target: string): Observable<AiResponse> {
    return this.http.post<AiResponse>(
      `${this.base}/translate?source=${source}&target=${target}`,
      { prompt }
    );
  }

  // READ - Historial completo
  getHistory(): Observable<AiResponse[]> {
    return this.http.get<AiResponse[]>(`${this.base}/history`);
  }

  // READ - Por proveedor
  getHistoryByProvider(provider: string): Observable<AiResponse[]> {
    return this.http.get<AiResponse[]>(`${this.base}/history/${provider}`);
  }

  // UPDATE
  update(id: string, prompt: string): Observable<AiResponse> {
    return this.http.put<AiResponse>(`${this.base}/history/${id}`, { prompt });
  }

  // DELETE lógico
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/history/${id}`);
  }
}
