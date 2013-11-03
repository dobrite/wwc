WWC
===

Websocket chat using centrifuge, pyramid, and backbone-marionette.
::
    $ make env

NOTE: Development is still rapidly ongoing so expect things to break from time
to time.

Installation
============

The following assumes Ubuntu 12.04 64-bit:

1. Download Vagrant 64 bit (1.3.5 at the time of this writing):
::
    $ wget http://files.vagrantup.com/packages/a40522f5fabccb9ddabad03d836e120ff5d14093/vagrant_1.3.5_x86_64.deb

2. Install:
::
    $ dpkg -i vagrant_1.3.5_x86_64.deb

3. Delete .deb file:
::
    $ rm vagrant_1.3.5_x86_64.deb

4. Install virtualbox:
::
    $ sudo apt-get install virtualbox

5. Clone this repo where you want it to live:
::
    $ git clone https://github.com/dobrite/wwc

6. cd into the repo:
::
    $ cd wwc

7. Start the dev VM (get some coffee):
::
    $ vagrant up
