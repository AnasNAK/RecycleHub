import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class PointsService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  calculatePoints(materials: { type: string; weight: number }[]): number {
    return materials.reduce((total, material) => {
      const points = {
        'plastic': 2,
        'glass': 1,
        'paper': 1,
        'metal': 5
      }[material.type] ?? 0;
      
      return total + (points * material.weight);
    }, 0);
  }

  convertPoints(userId: number, pointsToConvert: number): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/users/${userId}`, {
      points: pointsToConvert
    });
  }
} 