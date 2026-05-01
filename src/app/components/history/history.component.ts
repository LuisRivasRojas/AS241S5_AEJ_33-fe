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

  constructor(private api: ApiService) {}

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.api.getHistory().subscribe({
      next: (data) => { this.records = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  startEdit(record: AiResponse) {
    this.editingId = record.id!;
    this.editPrompt = record.prompt;
  }

  saveEdit(id: string) {
    this.api.update(id, this.editPrompt).subscribe({
      next: () => { this.editingId = null; this.load(); }
    });
  }

  cancelEdit() { this.editingId = null; }

  delete(id: string) {
    if (confirm('¿Eliminar este registro?')) {
      this.api.delete(id).subscribe({ next: () => this.load() });
    }
  }
}
