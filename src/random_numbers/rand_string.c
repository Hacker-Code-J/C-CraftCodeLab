#include <stdio.h>
#include <stdlib.h>
#include <time.h> 

void rand_string(char* str, int num) {
    for (int i = 0; i < num; i++)
        str[i] = rand() % ('z' - 'a') + 'a';
    str[num] = 0;
}

char random_char[] = {
    '0', '+', '-'
};

int rand_char_size = sizeof(random_char) / sizeof(char);

void rand_string_spec(char* str, int num) {
    for (int i = 0; i < num; i++)
        str[i] = random_char[rand() % rand_char_size];
    str[num] = 0;
}

int main(int argc, char* argv[]) {
    srand((unsigned int)time(NULL));
    char str[16];
    rand_string(str, 15);
    printf("%s\n\n", str);
    rand_string_spec(str, 15);
    printf("%s\n\n", str);

    return 0;
}