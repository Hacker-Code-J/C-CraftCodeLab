CC = gcc
# CFLAGS = -I../../include/utils.h -Wall
CFLAGS = -Wall -O2
BIN = ../../bin/random_numbers/
SRC = .
LIB = ../../lib/

TESTS = rand_num rand_floating_pt rand_string

.PHONY: all clean $(TESTS)

all: $(TESTS)

$(TESTS): %: $(SRC)/%.c
	$(CC) $(CFLAGS) -o $(BIN)$@ $(SRC)/$@.c

clean:
	rm -f $(BIN)*