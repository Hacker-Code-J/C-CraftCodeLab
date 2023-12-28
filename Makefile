SUBDIRS = src/random_numbers

.PHONY: all clean $(SUBDIRS)

all: $(SUBDIRS)

$(SUBDIRS):
	$(MAKE) -C $@ 

clean: 
	for dir in $(SUBDIRS); do \
		$(MAKE) -C $$dir clean; \
	done

rebuild: clean all