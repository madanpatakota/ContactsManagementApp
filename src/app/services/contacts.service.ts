import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/Contact';

@Injectable({
    providedIn: 'root'
})
export class ContactsService {

    private apiUrl = 'http://localhost:5136/api/contacts'; // Your API URL

    constructor(private http: HttpClient) { }

    // Get all contacts
    getContacts(): Observable<Contact[]> {
        return this.http.get<Contact[]>(this.apiUrl);
    }

    // Get a single contact by ID
    getContactById(id: number): Observable<Contact> {
        return this.http.get<Contact>(`${this.apiUrl}/${id}`);
    }

    // Add a new contact
    addContact(contact: Contact): Observable<Contact> {
        return this.http.post<Contact>(this.apiUrl, contact);
    }

    // Update a contact
    updateContact(id: number, contact: Contact): Observable<Contact> {
        return this.http.put<Contact>(`${this.apiUrl}/${id}`, contact);
    }

    // Delete a contact
    deleteContact(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
