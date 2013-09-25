import os
import sys

from setuptools import setup, find_packages

here = os.path.abspath(os.path.dirname(__file__))
README = open(os.path.join(here, 'README.txt')).read()
CHANGES = open(os.path.join(here, 'CHANGES.txt')).read()

requires = [
    'pyramid',
    'sqlalchemy',
    'transaction',
    'psycopg2',
    'pyramid_tm',
    'pyramid_debugtoolbar',
    'zope.sqlalchemy',
    'waitress',
    'centrifuge',
]

entry_points = """\
[paste.app_factory]
main = wwc:main

[console_scripts]
initialize_wwc_db = wwc.scripts.initializedb:main
"""  # nopep8

setup(
    name='wwc',
    version='0.0',
    description='Web-wide chat',
    long_description=README + '\n\n' + CHANGES,
    classifiers=[
        "Programming Language :: Python"
        "Framework :: Pyramid"
        "Topic :: Internet :: WWW/HTTP"
        "Topic :: Internet :: WWW/HTTP :: WSGI :: Application"
    ],
    author='Dave O',
    author_email='davidobrite@gmail.com',
    url='',
    keywords='web pyramid centrifuge',
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
    install_requires=requires,
    tests_require=requires,
    test_suite="wwc",
    entry_points=entry_points
)
