#!/usr/bin/env bash

apt-get update
apt-get install -y make

# build tool chain
apt-get install -y build-essential

# for python 3
apt-get install -y openssl libssl-dev libbz2-dev zlib1g-dev libexpat1-dev libdb4.8-dev libsqlite3-dev libncursesw5-dev libncurses5-dev libreadline-dev libxml2-dev python-software-properties
#
# compile python 3.3
wget http://python.org/ftp/python/3.3.2/Python-3.3.2.tar.bz2
mv Python-3.3.2.tar.bz2 /tmp
cd /tmp
tar jxf Python-3.3.2.tar.bz2
cd Python-3.3.2
./configure --prefix=/opt/python3.3
make && make install
ln -s /opt/python3.3/bin/pyvenv /usr/local/bin

cd /vagrant

# postgres 9.3
apt-get install -y libpq-dev
echo 'deb http://apt.postgresql.org/pub/repos/apt/ precise-pgdg main' | tee -a /etc/apt/sources.list.d/pgdg.list
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -
apt-get update
apt-get install -y postgresql-9.3

cd /vagrant

# redis 2.8.0-rc5
cd /opt
mkdir redis
chown vagrant:vagrant redis
cd redis
wget http://download.redis.io/releases/redis-2.8.0-rc5.tar.gz
tar xfvz redis-2.8.0-rc5.tar.gz
cd redis-2.8.0-rc5
make
src/redis-server --daemonize yes

cd /vagrant

# node 0.10.21
#http://nodejs.org/dist/node-latest.tar.gz
wget http://nodejs.org/dist/v0.10.21/node-v0.10.21.tar.gz
mv node-v0.10.21.tar.gz /tmp
cd /tmp
tar xfvz node-v0.10.21.tar.gz
cd node-v0.10.21
./configure --prefix=/opt/node
make && make install
ln -s /opt/node/bin/node /usr/local/bin

cd /vagrant

# npm
sudo apt-get -y install curl
cd /tmp
export clean=yes; curl https://npmjs.org/install.sh | sh

cd /vagrant

# bower
npm install -g bower

apt-get install -y git

# make the dev environment
make env
#make ws &
#make dev
