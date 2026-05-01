import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AiResponse } from '../../models/ai-response.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  standalone: false
})
export class ChatComponent {
  prompt = '';
  result: AiResponse | null = null;
  loading = false;
  error = '';

  constructor(private api: ApiService) {}

  send() {
    if (!this.prompt.trim()) return;
    this.loading = true;
    this.error = '';
    this.result = null;
    this.api.chat(this.prompt).subscribe({
      next: (res) => { this.result = res; this.loading = false; },
      error: (err) => { this.error = 'Error al conectar con el servidor'; this.loading = false; }
    });
  }
}
