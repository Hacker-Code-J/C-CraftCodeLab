#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "address_book.h"

// Function to create a new Address Book Entry
AddressBookEntry *CreateEntry(const char *name, const char *email, const char *phone) {
    AddressBookEntry *newEntry = (AddressBookEntry *)malloc(sizeof(AddressBookEntry));
    if (newEntry == NULL) {
        fprintf(stderr, "Error allocating memory\n");
        exit(EXIT_FAILURE);
    }
    strncpy(newEntry->name, name, sizeof(newEntry->name));
    strncpy(newEntry->email, email, sizeof(newEntry->email));
    strncpy(newEntry->phone, phone, sizeof(newEntry->phone));
    newEntry->next = NULL;
    return newEntry;
}

// Function to insert an entry into the address book
void InsertEntry(AddressBookEntry **head, AddressBookEntry *newEntry) {
    newEntry->next = *head;
    *head = newEntry;
}

// Function to delete an entry from the address book
void DeleteEntry(AddressBookEntry **head, const char *name) {
    AddressBookEntry *temp = *head, *prev = NULL;
    while (temp != NULL && strcmp(temp->name, name) != 0) {
        prev = temp;
        temp = temp->next;
    }
    if (temp == NULL) return;
    if (prev == NULL) {
        *head = temp->next;
    } else {
        prev->next = temp->next;
    }
    free(temp);
}

// Function to print the entire address book
void PrintAddressBook(AddressBookEntry *head) {
    AddressBookEntry *current = head;
    while (current != NULL) {
        printf("Name: %s, Email: %s, Phone: %s\n", current->name, current->email, current->phone);
        current = current->next;
    }
}

// Function to free the memory allocated for the address book
void FreeAddressBook(AddressBookEntry **head) {
    AddressBookEntry *temp;
    while (*head != NULL) {
        temp = *head;
        *head = (*head)->next;
        free(temp);
    }
}