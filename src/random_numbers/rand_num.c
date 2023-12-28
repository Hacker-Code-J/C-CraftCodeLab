#include <stdio.h>
#include <stdlib.h>
#include <time.h>  // Include this header for the time function

int rand_interval(int a, int b) {
    return rand() % (b - a) + a;
}


int main(int argc, char* argv[]) {
    // time_t seed = time(NULL);
    // srand(seed);
    srand((unsigned int)time(NULL));
    // printf("%d\n", rand());
    // printf("%d\n", rand());
    // printf("%d\n", rand());

    for(int i = 0; i < 100; i++) {
        printf("%d\n", rand_interval(5, 20));
    }

    return 0;
}