CC=gcc
CFLAGS=-pthread -Wall
TARGET=cpu_simulation

all: $(TARGET)

$(TARGET): $(TARGET).c
	$(CC) $(CFLAGS) -o $(TARGET) $(TARGET).c

clean:
	rm -f $(TARGET)


# SUBDIRS = src/random_numbers

# .PHONY: all clean $(SUBDIRS)

# all: $(SUBDIRS)

# $(SUBDIRS):
# 	$(MAKE) -C $@ 

# clean: 
# 	for dir in $(SUBDIRS); do \
# 		$(MAKE) -C $$dir clean; \
# 	done

# rebuild: clean all