import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';
import { Collection } from '../models/collection.interface';

@Injectable({
  providedIn: 'root'
})
export class PointsService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  calculatePoints(collection: Collection): number {
    return collection.materials.reduce((total, material) => {
      let points = 0;
      switch (material.type) {
        case 'Plastique':
          points = material.weight * 2;
          break;
        case 'Verre':
          points = material.weight * 1;
          break;
        case 'Papier':
          points = material.weight * 1;
          break;
        case 'Métal':
          points = material.weight * 5;
          break;
      }
      return total + points;
    }, 0);
  }

  convertPoints(userId: number, pointsToConvert: number): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/users/${userId}`, {
      points: pointsToConvert
    });
  }

  reduction(user:object):Observable<User>{
    

  }
} 