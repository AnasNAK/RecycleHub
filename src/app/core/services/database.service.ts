import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { User } from '../models/user.interface';
import { Collection } from '../models/collection.interface';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private apiUrl = 'http://localhost:3000';
  private collectorsSubject = new BehaviorSubject<User[]>([]);
  collectors$ = this.collectorsSubject.asObservable();

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {
    this.loadCollectors();
  }

  private loadCollectors(): void {
    this.http.get<User[]>(`${this.apiUrl}/users?role=collector`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 0) {
          this.notificationService.show(
            'Cannot connect to server. Please make sure json-server is running.',
            'error'
          );
        }
        return of([]);
      })
    ).subscribe({
      next: (collectors) => this.collectorsSubject.next(collectors),
      error: (error) => console.error('Failed to load collectors:', error)
    });
  }

  getUser(email: string, password: string): Observable<User | null> {
    return this.http.get<User[]>(
      `${this.apiUrl}/users?email=${email}&password=${password}&isActive=true`
    ).pipe(
      map(users => users[0] || null),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 0) {
          this.notificationService.show(
            'Cannot connect to server. Please make sure json-server is running.',
            'error'
          );
        }
        return of(null);
      })
    );
  }

  createUser(userData: Omit<User, 'id' | 'points' | 'isActive'>): Observable<User> {
    const newUser = {
      ...userData,
      isActive: true,
      points: 0
    };
    return this.http.post<User>(`${this.apiUrl}/users`, newUser);
  }

  updateUser(user: User): Observable<User> {
    if (!user.id) throw new Error('User ID is required');
    return this.http.put<User>(`${this.apiUrl}/users/${user.id}`, user);
  }

  deactivateUser(id: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/users/${id}`, { isActive: false });
  }

  getCollectionsByCity(city: string): Observable<Collection[]> {
    return this.http.get<Collection[]>(`${this.apiUrl}/collections?city=${city}`);
  }

  getUserCollections(userId: string): Observable<Collection[]> {
    return this.http.get<Collection[]>(`${this.apiUrl}/collections?userId=${userId}`);
  }

  createCollection(collection: Omit<Collection, 'id'>): Observable<Collection> {
    return this.http.post<Collection>(`${this.apiUrl}/collections`, collection);
  }

  updateCollection(collection: Collection): Observable<Collection> {
    return this.http.put<Collection>(
      `${this.apiUrl}/collections/${collection.id}`, 
      collection
    );
  }
} 