import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Collection } from '../models/collection.interface';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  private apiUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private dbService: DatabaseService
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
    return this.dbService.getCollectionsByCity(city);
  }

  deleteCollection(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getAllCollections(): Observable<Collection[]> {
    return this.http.get<Collection[]>(`${this.apiUrl}/collections`);
  }
} 