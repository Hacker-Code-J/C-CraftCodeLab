# Compiler to use
CC = gcc

# Compiler flags
CFLAGS = -Iinclude

# Directories
OBJDIR = obj
SRCDIR = src
TESTDIR = test
OUTDIR = test/bin

# Header file dependencies
_DEPS = linked_list.h address_book.h
DEPS = $(patsubst %,include/%,$(_DEPS))

# Object files for main source (excluding main)
_OBJ = linked_list.o address_book.o
OBJ = $(patsubst %,$(OBJDIR)/%,$(_OBJ))

# Test source files
# _TESTS = linked_list_test.c address_book_test.c
_TESTS = address_book_test.c
TESTS = $(patsubst %,$(TESTDIR)/%,$(_TESTS))
TEST_EXECUTABLES = $(patsubst %,$(OUTDIR)/%,$(basename $(_TESTS)))

# Rule for generating object files
$(OBJDIR)/%.o: $(SRCDIR)/%.c $(DEPS)
	$(CC) -c -o $@ $< $(CFLAGS)

# Rule for building each test executable
$(OUTDIR)/%: $(TESTDIR)/%.c $(OBJ)
	$(CC) -o $@ $^ $(CFLAGS)

# Phony targets for clean, rebuild, and test
.PHONY: clean rebuild test

# Rule for cleaning the project
clean:
	rm -f $(OBJDIR)/*.o $(OUTDIR)/* *~ core *~

# Rule for rebuilding the project
rebuild: clean $(TEST_EXECUTABLES)

# Rule for running a specific test or all tests
test: $(TEST_EXECUTABLES)
ifdef TEST
	@echo "Running test: $(TEST)"
	@./$(OUTDIR)/$(TEST)
else
	@echo "Running all tests..."
	@$(foreach exec,$(basename $(_TESTS)),./$(OUTDIR)/$(exec);)
endif

# Create the output directory if it doesn't exist
$(shell mkdir -p $(OUTDIR))