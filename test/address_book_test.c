#include <stdio.h>
#include "address_book.h"

int main() {
    // Initialize the head of the address book to NULL
    AddressBookEntry *head = NULL;

    // Create and insert some entries
    printf("Adding entries to the address book...\n");
    InsertEntry(&head, CreateEntry("Alice Johnson", "alice@example.com", "123-456-7890"));
    InsertEntry(&head, CreateEntry("Bob Smith", "bob@example.com", "234-567-8901"));
    InsertEntry(&head, CreateEntry("Charlie Brown", "charlie@example.com", "345-678-9012"));

    // Display the address book
    printf("\nCurrent address book:\n");
    PrintAddressBook(head);

    // Delete an entry
    printf("\nDeleting 'Bob Smith' from the address book...\n");
    DeleteEntry(&head, "Bob Smith");

    // Display the address book after deletion
    printf("\nAddress book after deletion:\n");
    PrintAddressBook(head);

    // Free the allocated memory
    printf("\nFreeing up memory and exiting...\n");
    FreeAddressBook(&head);

    return 0;
}