import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactsService } from '../../services/contacts.service';
import { Contact } from '../../models/Contact';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  isEditMode: boolean = false;  // Flag to check if it's an edit or add mode
  currentContactId: number | null = null;  // To hold the current contact ID for editing

  constructor(
    private fb: FormBuilder,
    private contactsService: ContactsService,
    private router: Router,
    private route: ActivatedRoute  // To get parameters from the URL (e.g., for editing)
  ) {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    // Check if we are in edit mode (i.e., we have a contact ID in the URL)
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');  // Extract the contact ID from the URL
      if (id) {
        this.isEditMode = true;  // Set the flag to true
        this.currentContactId = +id;  // Store the contact ID as a number
        this.loadContactData();  // Load the contact data to edit
      }
    });
  }

  // Load contact data when in edit mode
  loadContactData(): void {
    if (this.currentContactId !== null) {
      this.contactsService.getContactById(this.currentContactId).subscribe(contact => {
        if (contact) {
          this.contactForm.patchValue({
            firstName: contact.firstName,
            lastName: contact.lastName,
            email: contact.email
          });
        }
      });
    }
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const contact: Contact = this.contactForm.value;

      if (this.isEditMode && this.currentContactId !== null) {
        // If in edit mode, update the contact
        this.contactsService.updateContact(this.currentContactId, contact).subscribe(() => {
          this.router.navigate(['/contacts']);
        });
      } else {
        // If in add mode, add the new contact
        this.contactsService.addContact(contact).subscribe(() => {
          this.router.navigate(['/contacts']);
        });
      }
    }
  }
}
