import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AiResponse } from '../../models/ai-response.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  standalone: false
})
export class HistoryComponent implements OnInit {
  records: AiResponse[] = [];
  loading = false;
  editingId: string | null = null;
  editPrompt = '';
  editSource = 'en';
  editTarget = 'es';
  editProvider = '';
  activeFilter: 'ALL' | 'OPENAI_RAPIDAPI' | 'DEEP_TRANSLATE' = 'ALL';

  constructor(private api: ApiService) {}

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    const request$ = this.activeFilter === 'ALL'
      ? this.api.getHistory()
      : this.api.getHistoryByProvider(this.activeFilter);

    request$.subscribe({
      next: (data) => { this.records = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  setFilter(filter: 'ALL' | 'OPENAI_RAPIDAPI' | 'DEEP_TRANSLATE') {
    this.activeFilter = filter;
    this.editingId = null;
    this.load();
  }

  startEdit(record: AiResponse) {
    this.editingId = record.id!;
    this.editProvider = record.apiProvider;

    if (record.apiProvider === 'DEEP_TRANSLATE') {
      // Extraer texto limpio y idiomas del prompt guardado: "texto [en->es]"
      const match = record.prompt.match(/^(.*)\[(\w+)->(\w+)\]$/);
      if (match) {
        this.editPrompt = match[1].trim();
        this.editSource = match[2];
        this.editTarget = match[3];
      } else {
        this.editPrompt = record.prompt;
        this.editSource = 'en';
        this.editTarget = 'es';
      }
    } else {
      this.editPrompt = record.prompt;
    }
  }

  saveEdit(id: string) {
    if (this.editProvider === 'DEEP_TRANSLATE') {
      this.api.updateTranslate(id, this.editPrompt, this.editSource, this.editTarget).subscribe({
        next: () => { this.editingId = null; this.load(); }
      });
    } else {
      this.api.updateChat(id, this.editPrompt).subscribe({
        next: () => { this.editingId = null; this.load(); }
      });
    }
  }

  cancelEdit() { this.editingId = null; }

  delete(id: string, provider: string) {
    if (confirm('¿Eliminar este registro?')) {
      this.api.delete(id, provider).subscribe({ next: () => this.load() });
    }
  }
}
