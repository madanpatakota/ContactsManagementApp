// src/app/app.component.ts
import { Component } from '@angular/core';
import { ContactsService } from './services/contacts.service';
import { Contact } from './models/Contact';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isEditMode = false;
  currentContact: Contact | null = null;

  constructor(private contactsService: ContactsService) { }

  addContact(): void {
    this.isEditMode = false;
    this.currentContact = null;
  }

  editContact(contact: Contact): void {
    this.isEditMode = true;
    this.currentContact = { ...contact };  // Make a copy to edit
  }

  saveContact(contact: Contact): void {
    if (this.isEditMode) {
      this.contactsService.updateContact(contact.id, contact).subscribe(() => {
        this.addContact();  // Reset the form
      });
    } else {
      this.contactsService.addContact(contact).subscribe(() => {
        this.addContact();  // Reset the form
      });
    }
  }
}
