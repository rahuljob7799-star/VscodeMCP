import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { BmiResult } from '../../models/bmi-record.model';

@Component({
  selector: 'app-result-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDividerModule, MatProgressBarModule, MatIconModule],
  templateUrl: './result-card.component.html',
  styleUrls: ['./result-card.component.scss']
})
export class ResultCardComponent {
  @Input() result: BmiResult | null = null;

  get progressValue(): number {
    if (!this.result) {
      return 0;
    }
    return Math.min(Math.max((this.result.bmi / 40) * 100, 0), 100);
  }

  get gradientColor(): string {
    return this.result ? this.result.color : '#93c5fd';
  }
}
