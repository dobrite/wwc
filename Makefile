.PHONY: build

build:
	/opt/python3.3/bin/pyvenv-3.3 --upgrade .
	wget https://bitbucket.org/pypa/setuptools/raw/bootstrap/ez_setup.py -O - | bin/python3.3
	bin/python3.3 bootstrap.py
	bin/buildout

clean:
	rm -rf bin/ include/ lib/ .installed.cfg .mr.developer.cfg develop-eggs/ eggs/ parts/ src/
