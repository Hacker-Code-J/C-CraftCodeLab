#include <stdio.h>
#include <stdlib.h>
#include <time.h>

double rand_double() {
    // RAND_MAX 2147483647
    return ((double)rand()) / ((double)RAND_MAX);
}

double rand_double_interval(double a, double b) {
    return rand_double() * (b - a) + a;  
}

int main(int argc, char* argv[]) {
    srand((unsigned int)time(NULL));
    for(int i = 0; i < 100; i++) {
        printf("%lf\n", rand_double());
    }

    return 0;
}