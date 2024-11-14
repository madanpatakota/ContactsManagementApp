import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../../services/contacts.service';
import { Router } from '@angular/router';
import { Contact } from '../../models/Contact';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: any = [];

  constructor(
    private contactsService: ContactsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.contactsService.getContacts().subscribe((data) => {
      this.contacts = data;
    });
  }

  editContact(id: number): void {
    // Navigate to the edit page of the contact
    this.router.navigate([`/edit/${id}`]);
  }

  deleteContact(id: number): void {
    this.contactsService.deleteContact(id).subscribe(() => {
      this.loadContacts(); // Reload the contacts list after deletion
    });
  }

  // Navigate to the Add Contact form
  addContact(): void {
    this.router.navigate(['/contacts/add']);
  }
}
