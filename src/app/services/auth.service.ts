import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    user_type: string;
    email: string;
    password: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUser: User | null = null;

    constructor(private http: HttpClient) { }

    login(email: string, password: string): Observable<User> {
        return this.http.get<User[]>('assets/admin-user-dashboard-data/user.json').pipe(
            map(users => {
                const user = users.find(u => u.email === email && u.password === password);
                if (!user) {
                    throw new Error('Invalid credentials');
                }
                this.currentUser = user;
                return user;
            })
        );
    }

    getCurrentUser(): User | null {
        return this.currentUser;
    }

    logout(): void {
        this.currentUser = null;
    }
} 