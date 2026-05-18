import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BmiFormComponent } from './components/bmi-form/bmi-form.component';
import { ResultCardComponent } from './components/result-card/result-card.component';
import { BmiService } from './services/bmi.service';
import { BmiRecord, BmiResult } from './models/bmi-record.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, BmiFormComponent, ResultCardComponent, NgChartsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  darkMode = false;
  isCalculating = false;
  result: BmiResult | null = null;
  history: BmiRecord[] = [];

  chartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  chartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Underweight', 'Normal', 'Overweight', 'Obese'],
    datasets: [{ data: [0, 0, 0, 0], backgroundColor: ['#2563eb', '#22c55e', '#f59e0b', '#ef4444'] }]
  };

  displayedColumns = ['date', 'bmi', 'category', 'height', 'weight'];

  constructor(private readonly bmiService: BmiService) {}

  ngOnInit(): void {
    this.loadHistory();
    this.applyBodyTheme();
  }

  calculate(measurement: { height: number; heightUnit: 'cm' | 'ft'; weight: number; weightUnit: 'kg' | 'lb' }): void {
    this.isCalculating = true;
    window.setTimeout(() => {
      this.result = this.bmiService.calculateBmi(measurement);
      this.bmiService.saveRecord(this.result);
      this.loadHistory();
      this.isCalculating = false;
    }, 650);
  }

  clearResult(): void {
    this.result = null;
  }

  loadHistory(): void {
    this.history = this.bmiService.getHistory();
    const counts = this.history.reduce(
      (acc, item) => {
        switch (item.category) {
          case 'Underweight':
            acc[0]++;
            break;
          case 'Normal':
            acc[1]++;
            break;
          case 'Overweight':
            acc[2]++;
            break;
          case 'Obese':
            acc[3]++;
            break;
        }
        return acc;
      },
      [0, 0, 0, 0]
    );

    this.chartData = {
      labels: ['Underweight', 'Normal', 'Overweight', 'Obese'],
      datasets: [{
        data: counts,
        backgroundColor: ['#2563eb', '#22c55e', '#f59e0b', '#ef4444'],
        hoverOffset: 6
      }]
    };
  }

  toggleTheme(): void {
    this.darkMode = !this.darkMode;
    this.applyBodyTheme();
  }

  private applyBodyTheme(): void {
    document.body.classList.toggle('dark-theme', this.darkMode);
  }
}
