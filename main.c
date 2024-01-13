#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int a;
    double b;
    char c;
} ExampleStruct;

int globalVar; // Global variable

void printMemoryInfo(const char* name, void* address, size_t size) {
    printf("%-30s: Address = %p, Size = %zu bytes\n", name, address, size);
}

int main() {
    // Local variables
    int localVar = 5;
    double localDoubleVar = 10.0;
    char localCharVar = 'A';

    // Array
    int arrayVar[5] = {1, 2, 3, 4, 5};

    // Structure
    ExampleStruct myStruct;
    myStruct.a = 1;
    myStruct.b = 2.0;
    myStruct.c = 'C';

    // Dynamically allocated memory
    int *dynamicVar = malloc(10 * sizeof(int));

    // Printing memory information
    printMemoryInfo("Address of main function", main, 0); // Size of function is not straightforward
    printMemoryInfo("Global variable", &globalVar, sizeof(globalVar));
    printMemoryInfo("Local integer variable", &localVar, sizeof(localVar));
    printMemoryInfo("Local double variable", &localDoubleVar, sizeof(localDoubleVar));
    printMemoryInfo("Local char variable", &localCharVar, sizeof(localCharVar));
    printMemoryInfo("Integer array", arrayVar, sizeof(arrayVar));
    printMemoryInfo("Example structure", &myStruct, sizeof(myStruct));
    printMemoryInfo("Dynamically allocated array", dynamicVar, 10 * sizeof(int));

    // Free the allocated memory
    free(dynamicVar);

    return 0;
}
