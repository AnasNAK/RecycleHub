export interface Collection {
  id?: string;
  userId: string;
  materials: {
    type: string;
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
}

export type CollectionStatus = 'pending' | 'occupied' | 'in_progress' | 'completed' | 'rejected'; 