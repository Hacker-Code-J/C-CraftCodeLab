#ifndef _ADDRESS_BOOK_H
#define _ADDRESS_BOOK_H

// Structure for Address Book Entry
typedef struct AddressBookEntry {
    char name[50];
    char email[100];
    char phone[15];
    struct AddressBookEntry *next;
} AddressBookEntry;

// Function prototypes
AddressBookEntry *CreateEntry(const char *name, const char *email, const char *phone);
void InsertEntry(AddressBookEntry **head, AddressBookEntry *newEntry);
void DeleteEntry(AddressBookEntry **head, const char *name);
void PrintAddressBook(AddressBookEntry *head);
void FreeAddressBook(AddressBookEntry **head);

#endif // _ADDRESS_BOOK_H
