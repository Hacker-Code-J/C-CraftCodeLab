#ifndef _LINKED_LIST_H
#define _LINKED_LIST_H

struct Node {
    int data;
    struct Node* next;
};

struct Node* createNode(int data);
void NodeInsertAtStart(struct Node** head_ref, int new_data);
void NodeInsertAtEnd(struct Node** head_ref, int new_data);
void deleteNode(struct Node** head_ref, int key);
void DisplayList(struct Node* node);

#endif // _LINKED_LIST_H