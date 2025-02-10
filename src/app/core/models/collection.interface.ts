export interface Collection {
  id?: string;
  userId: string;
  materials: {
    type: 'Plastique' | 'Verre' | 'Papier' | 'Métal';
    weight: number;
    photos?: string[];
  }[];
  totalWeight: number;
  address: string;
  city: string;
  collectionDate: string;
  timeSlot: string;
  notes?: string;
  status: CollectionStatus;
  collectorId?: string;
  collectionPhotos?: string[];
  actualWeight?: number;
  createdAt: string;
  updatedAt: string;
  type: 'Plastique' | 'Verre' | 'Papier' | 'Métal';
  weight: number;
}

export type CollectionStatus = 'pending' | 'occupied' | 'in_progress' | 'completed' | 'rejected'; 