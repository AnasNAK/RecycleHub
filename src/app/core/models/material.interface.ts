export interface Material {
  id: string;
  name: string;
  pointsPerKg: number;
  icon: string;
}

export const MATERIALS: Material[] = [
  { id: 'plastic', name: 'Plastic', pointsPerKg: 2, icon: 'plastic' },
  { id: 'glass', name: 'Glass', pointsPerKg: 1, icon: 'glass' },
  { id: 'paper', name: 'Paper', pointsPerKg: 1, icon: 'paper' },
  { id: 'metal', name: 'Metal', pointsPerKg: 5, icon: 'metal' }
];
 