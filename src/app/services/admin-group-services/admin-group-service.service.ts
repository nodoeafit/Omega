import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Group } from '../../model/group.model';

@Injectable({
  providedIn: 'root'
})
export class AdminGroupServiceService {
  private groupsUrl = 'assets/admin-user-dashboard-data/groups.json';
  private groupsSubject = new BehaviorSubject<any[]>([]); // Store groups in memory
  groups$ = this.groupsSubject.asObservable(); // Observable for components

  constructor(private http: HttpClient) {
    this.loadGroups(); // Load JSON initially
  }

  // Load JSON from file
  private loadGroups(): void {
    this.http.get<any[]>(this.groupsUrl).subscribe(data => {
      this.groupsSubject.next(data);
    });
  }

  // Get all groups
  getGroups(): Observable<any[]> {
    return this.groups$;
  }

  // Get a group by ID
  getGroupById(id: number): Observable<any | undefined> {
    return this.groups$.pipe(map(groups => groups.find(group => group.id === id)));
  }

  // Add a new group
  addGroup(newGroup: any): void {
    const groups = this.groupsSubject.getValue();
    newGroup.id = groups.length + 1; // Auto-increment ID
    groups.push(newGroup);
    this.groupsSubject.next(groups);
  }

  // Update an existing group
  updateGroup(updatedGroup: any): void {
    const groups = this.groupsSubject.getValue();
    const index = groups.findIndex(group => group.id === updatedGroup.id);
    if (index !== -1) {
      groups[index] = updatedGroup;
      this.groupsSubject.next(groups);
    }
  }

  // Delete a group by ID
  deleteGroup(id: number): void {
    const groups = this.groupsSubject.getValue().filter(group => group.id !== id);
    this.groupsSubject.next(groups);
  }
}
