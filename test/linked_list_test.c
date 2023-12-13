#include <stdio.h>
#include "linked_list.h"

int main() {
    struct Node* head = NULL;

    printf("Inserting nodes at the start of the list.\n");
    NodeInsertAtStart(&head, 10); // List: 10
    NodeInsertAtStart(&head, 20); // List: 20 -> 10
    NodeInsertAtStart(&head, 30); // List: 30 -> 20 -> 10
    DisplayList(head);

    printf("\nInserting nodes at the end of the list.\n");
    NodeInsertAtEnd(&head, 40);   // List: 30 -> 20 -> 10 -> 40
    NodeInsertAtEnd(&head, 50);   // List: 30 -> 20 -> 10 -> 40 -> 50
    DisplayList(head);

    printf("\nDeleting a node from the list.\n");
    deleteNode(&head, 20);        // List: 30 -> 10 -> 40 -> 50 (20 is deleted)
    DisplayList(head);

    printf("\nDeleting another node from the list.\n");
    deleteNode(&head, 30);        // List: 10 -> 40 -> 50 (30 is deleted)
    DisplayList(head);

    // Add additional operations here as needed

    return 0;
}