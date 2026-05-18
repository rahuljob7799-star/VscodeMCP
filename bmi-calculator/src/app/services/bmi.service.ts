import { Injectable } from '@angular/core';
import { BmiCategory, BmiMeasurement, BmiRecord, BmiResult } from '../models/bmi-record.model';

@Injectable({
  providedIn: 'root'
})
export class BmiService {
  private readonly storageKey = 'bmiCalculatorHistory';

  getHistory(): BmiRecord[] {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) {
      return [];
    }

    try {
      const records = JSON.parse(raw) as BmiRecord[];
      return records.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch {
      localStorage.removeItem(this.storageKey);
      return [];
    }
  }

  saveRecord(record: BmiResult): void {
    const history = this.getHistory();
    const updated = [record, ...history].slice(0, 20);
    localStorage.setItem(this.storageKey, JSON.stringify(updated));
  }

  calculateBmi(measurement: BmiMeasurement): BmiResult {
    const heightCm = measurement.heightUnit === 'ft'
      ? this.convertFeetToCm(measurement.height)
      : measurement.height;
    const weightKg = measurement.weightUnit === 'lb'
      ? this.convertPoundsToKg(measurement.weight)
      : measurement.weight;

    const meters = heightCm / 100;
    const bmi = Number((weightKg / (meters * meters)).toFixed(1));
    const category = this.getCategory(bmi);
    const color = this.getCategoryColor(category);
    const suggestion = this.getSuggestion(category);

    return {
      id: this.createId(),
      createdAt: new Date().toISOString(),
      heightCm,
      heightUnit: measurement.heightUnit,
      weightKg,
      weightUnit: measurement.weightUnit,
      bmi,
      category,
      color,
      suggestion
    };
  }

  private getCategory(bmi: number): BmiCategory {
    if (bmi < 18.5) {
      return 'Underweight';
    }
    if (bmi < 25) {
      return 'Normal';
    }
    if (bmi < 30) {
      return 'Overweight';
    }
    return 'Obese';
  }

  private getCategoryColor(category: BmiCategory): string {
    switch (category) {
      case 'Underweight':
        return '#2563eb';
      case 'Normal':
        return '#22c55e';
      case 'Overweight':
        return '#f59e0b';
      case 'Obese':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  }

  private getSuggestion(category: BmiCategory): string {
    switch (category) {
      case 'Underweight':
        return 'Focus on nutrient-rich meals and strength building to reach a healthy weight.';
      case 'Normal':
        return 'Great job! Keep your balanced diet and stay active to maintain your health.';
      case 'Overweight':
        return 'Try consistent activity, portion control, and lean protein to improve your BMI.';
      case 'Obese':
        return 'Speak with a healthcare provider about a sustainable plan for healthier weight loss.';
      default:
        return 'Maintain a steady routine and excellent hydration for lasting wellness.';
    }
  }

  private convertFeetToCm(feet: number): number {
    return feet * 30.48;
  }

  private convertPoundsToKg(pounds: number): number {
    return pounds * 0.45359237;
  }

  private createId(): string {
    return Math.random().toString(36).slice(2, 12) + Date.now().toString(36);
  }
}
