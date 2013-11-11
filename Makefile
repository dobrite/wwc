.PHONY: build, test

env:
	pyvenv --upgrade .
	wget https://bitbucket.org/pypa/setuptools/raw/bootstrap/ez_setup.py -O - | bin/python3.3
	bin/python3.3 bootstrap.py
	bin/buildout
	rm setuptools-*

clean:
	rm -rf bin/ include/ lib/ .installed.cfg .mr.developer.cfg develop-eggs/ eggs/ parts/ src/ node_modules/ app/bower_components/ __pycache__/ .cache/

dev:
	bin/pserve wwc/development.ini --reload

ws:
	bin/centrifuge --config=config.json

shell:
	bin/pshell -p bpython wwc/development.ini

build:
	node node_modules/requirejs/bin/r.js -o build.js

db:
	bin/initialize_wwc_db wwc/development.ini

drop_db:
	bin/delete_wwc_db wwc/development.ini

test:
	bin/py.test wwc/
