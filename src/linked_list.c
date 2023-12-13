#include <stdio.h>
#include <stdlib.h>
#include "linked_list.h"

// Function to create a new Node
// Input: int data - the value to be stored in the node
// Returns: struct Node* - a pointer to the newly created node
struct Node* createNode(int data) {
    struct Node* newNode = (struct Node*) malloc(sizeof(struct Node));
    if (newNode == NULL) {
        fprintf(stderr, "Error allocating memory\n");
        exit(EXIT_FAILURE);
    }
    newNode->data = data;
    newNode->next = NULL;
    return newNode;
}

// Function to insert a node at the start of the list
// Input: struct Node** head_ref - pointer to the head pointer of the list
//        int new_data - the value to be added
// Modifies the list to add a new node at the beginning
void NodeInsertAtStart(struct Node** head_ref, int new_data) {
    struct Node* new_node = createNode(new_data);
    new_node->next = *head_ref;
    *head_ref = new_node;
}

// Function to insert a node at the end of the list
// Input: struct Node** head_ref - pointer to the head pointer of the list
//        int new_data - the value to be added
// Modifies the list to add a new node at the end
void NodeInsertAtEnd(struct Node** head_ref, int new_data) {
    struct Node* new_node = createNode(new_data);
    if (*head_ref == NULL) {
        *head_ref = new_node;
        return;
    }
    struct Node* last = *head_ref;
    while (last->next != NULL) {
        last = last->next;
    }
    last->next = new_node;
}

// Function to delete a node with a given key from the list
// Input: struct Node** head_ref - pointer to the head pointer of the list
//        int key - the value of the node to be deleted
// Modifies the list by removing the node with the specified value
void deleteNode(struct Node** head_ref, int key) {
    struct Node *temp = *head_ref, *prev = NULL;
    if (temp != NULL && temp->data == key) {
        *head_ref = temp->next;
        free(temp);
        return;
    }
    while (temp != NULL && temp->data != key) {
        prev = temp;
        temp = temp->next;
    }
    if (temp == NULL) {
        return; // Key was not found
    }
    prev->next = temp->next;
    free(temp);
}

// Function to display the contents of the list
// Input: struct Node* node - pointer to the head of the list
// Prints out each element in the list
void DisplayList(struct Node* node) {
    while (node != NULL) {
        printf("%d ", node->data);
        node = node->next;
    }
    printf("\n");
}