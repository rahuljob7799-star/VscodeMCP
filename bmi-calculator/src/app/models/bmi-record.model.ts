export type HeightUnit = 'cm' | 'ft';
export type WeightUnit = 'kg' | 'lb';

export type BmiCategory = 'Underweight' | 'Normal' | 'Overweight' | 'Obese';

export interface BmiMeasurement {
  height: number;
  heightUnit: HeightUnit;
  weight: number;
  weightUnit: WeightUnit;
}

export interface BmiRecord {
  id: string;
  createdAt: string;
  heightCm: number;
  heightUnit: HeightUnit;
  weightKg: number;
  weightUnit: WeightUnit;
  bmi: number;
  category: BmiCategory;
  suggestion: string;
  color: string;
}

export interface BmiResult extends BmiRecord {}
