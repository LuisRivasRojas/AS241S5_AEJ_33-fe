import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AiResponse } from '../../models/ai-response.model';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  standalone: false
})
export class TranslateComponent {
  prompt = '';
  source = 'en';
  target = 'es';
  result: AiResponse | null = null;
  loading = false;
  error = '';

  languages = [
    { code: 'auto', name: 'Auto-detectar' },
    { code: 'es', name: 'Español' },
    { code: 'en', name: 'Inglés' },
    { code: 'fr', name: 'Francés' },
    { code: 'pt', name: 'Portugués' },
    { code: 'de', name: 'Alemán' },
    { code: 'it', name: 'Italiano' },
    { code: 'ja', name: 'Japonés' },
    { code: 'zh', name: 'Chino' },
    { code: 'ru', name: 'Ruso' },
    { code: 'ar', name: 'Árabe' },
    { code: 'ko', name: 'Coreano' }
  ];

  constructor(private api: ApiService) {}

  translate() {
    if (!this.prompt.trim()) return;
    this.loading = true;
    this.error = '';
    this.result = null;
    this.api.translate(this.prompt, this.source, this.target).subscribe({
      next: (res) => { this.result = res; this.loading = false; },
      error: () => { this.error = 'Error al traducir'; this.loading = false; }
    });
  }
}
