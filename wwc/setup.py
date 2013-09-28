import os

from setuptools import setup, find_packages

here = os.path.abspath(os.path.dirname(__file__))
with open(os.path.join(here, 'README.txt')) as f:
    README = f.read()
with open(os.path.join(here, 'CHANGES.txt')) as f:
    CHANGES = f.read()

requires = [
    'pyramid',
    'pyramid_debugtoolbar',
    'pyramid_tm',
    'pyramid_mako',
    'pyramid_redis_sessions',
    'pyramid_mailer',
    'horus',
    'SQLAlchemy',
    'psycopg2',
    'transaction',
    'zope.sqlalchemy',
    'waitress',
    'centrifuge',
]

entry_points="""\
[paste.app_factory]
main = wwc:main

[console_scripts]
initialize_wwc_db = wwc.scripts.initializedb:main
truncate_wwc_db = wwc.scripts.truncatedb:main
"""

setup(
    name='wwc',
    version='0.0',
    description='Web-wide chat',
    long_description=README + '\n\n' + CHANGES,
    classifiers=[
    "Programming Language :: Python",
    "Framework :: Pyramid",
    "Topic :: Internet :: WWW/HTTP",
    "Topic :: Internet :: WWW/HTTP :: WSGI :: Application",
    ],
    author='Dave O',
    author_email='davidobrite@gmail.com',
    url='',
    keywords='web wsgi pyramid centrifuge',
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
    test_suite='wwc',
    install_requires=requires,
    entry_points=entry_points
)
