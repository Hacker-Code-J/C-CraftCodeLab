#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <unistd.h>  // Include for sleep function

#define NUM_THREADS 4

void* performWork(void* argument) {
   int passed_in_value;

   passed_in_value = *((int *) argument);
   printf("Thread %d: Started\n", passed_in_value);
   
   // Simulate work being done
   sleep(1);

   printf("Thread %d: Finished\n", passed_in_value);
   
   return NULL;
}

int main(void) {
    pthread_t threads[NUM_THREADS];
    int thread_args[NUM_THREADS];
    int result_code, index;

    // Create all threads one by one
    for (index = 0; index < NUM_THREADS; index++) {
        thread_args[index] = index;
        printf("Main: creating thread %d\n", index);
        result_code = pthread_create(&threads[index], NULL, performWork, (void *) &thread_args[index]);
        if (result_code) {
            printf("ERROR; return code from pthread_create() is %d\n", result_code);
            exit(-1);
        }
    }

    // Wait for each thread to complete
    for (index = 0; index < NUM_THREADS; index++) {
        result_code = pthread_join(threads[index], NULL);
        printf("Main: thread %d has completed\n", index);
        if (result_code) {
            printf("ERROR; return code from pthread_join() is %d\n", result_code);
            exit(-1);
        }
    }

    printf("Main: program completed. Exiting.\n");
    exit(0);
}
