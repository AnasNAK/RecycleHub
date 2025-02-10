import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Collection } from '../models/collection.interface';
import { DatabaseService } from './database.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  private apiUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private dbService: DatabaseService,
    private authService: AuthService
  ) {}

  getUserCollections(userId: string): Observable<Collection[]> {
    return this.dbService.getUserCollections(userId);
  }

  createCollection(collection: Omit<Collection, 'id'>): Observable<Collection> {
    return this.dbService.createCollection(collection);
  }

  updateCollection(collection: Collection): Observable<Collection> {
    return this.dbService.updateCollection(collection);
  }

  getCollectionsByCity(city: string): Observable<Collection[]> {
    return this.http.get<Collection[]>(`${this.apiUrl}/collections`).pipe(
      map(collections => collections.filter(
        collection => 
          collection.city.toLowerCase() === city.toLowerCase() && 
          !collection.collectorId // Only show unassigned collections
      ))
    );
  }

  deleteCollection(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getAllCollections(): Observable<Collection[]> {
    return this.http.get<Collection[]>(`${this.apiUrl}/collections`);
  }

  acceptCollection(collectionId: string): Observable<any> {
    return this.authService.currentUser$.pipe(
      map(user => {
        if (!user) throw new Error('No authenticated user');
        
        return this.http.patch(`${this.apiUrl}/${collectionId}`, {
          status: 'occupied',
          collectorId: user.id
        });
      })
    );
  }
} 