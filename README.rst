WWC
===

Websocket chat using centrifuge, pyramid, and backbone-marionette.

NOTE: Development is still rapidly ongoing so expect things to break from time
to time.

Installation
============

The following assumes Ubuntu 12.04 64-bit:

1. Install Vagrant 64 bit (1.3.5 at the time of this writing):
::
    $ wget http://files.vagrantup.com/packages/a40522f5fabccb9ddabad03d836e120ff5d14093/vagrant_1.3.5_x86_64.deb
    $ dpkg -i vagrant_1.3.5_x86_64.deb
    $ rm vagrant_1.3.5_x86_64.deb

2. Install virtualbox (12.04 package has a bug):
::
    $ wget http://download.virtualbox.org/virtualbox/4.3.2/virtualbox-4.3_4.3.2-90405~Ubuntu~precise_amd64.deb
    $ dpkg -i virtualbox-4.3_4.3.2-90405~Ubuntu~precise_amd64.deb
    $ rm virtualbox-4.3_4.3.2-90405~Ubuntu~precise_amd64.deb

3. Clone this repo where you want it to live:
::
    $ git clone https://github.com/dobrite/wwc

4. cd into the repo:
::
    $ cd wwc

5. Start the dev VM (get some coffee):
::
    $ vagrant up
