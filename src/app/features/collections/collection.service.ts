import { Injectable } from '@angular/core';
import { PointsService } from '../../core/services/points.service';
import { Collection } from '../../core/models/collection.interface';
import { UserService } from '../../core/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  constructor(
    private pointsService: PointsService,
    private userService: UserService
  ) {}

  completeCollection(collection: Collection): void {
    if (collection.status === 'completed') {
      const points = this.pointsService.calculatePoints(collection);
      this.addPointsToUser(collection.userId, points);
    }
  }

  private addPointsToUser(userId: string, points: number): void {
    this.userService.addPoints(userId, points).subscribe({
      next: () => console.log(`Added ${points} points to the user.`),
      error: (err) => console.error('Failed to add points:', err)
    });
  }
} 