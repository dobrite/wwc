#!/usr/bin/env bash

apt-get update

# build tool chain
apt-get install -y make build-essential
apt-get install -y git

# for python 3
apt-get install -y openssl libssl-dev libbz2-dev zlib1g-dev libexpat1-dev libdb4.8-dev libsqlite3-dev libncursesw5-dev libncurses5-dev libreadline-dev libxml2-dev python-software-properties
#
# compile python 3.3
cd /tmp
wget http://python.org/ftp/python/3.3.2/Python-3.3.2.tar.bz2
tar jxf Python-3.3.2.tar.bz2 --strip-components 1
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
# could use chris-lea/redis-server once it's released
cd /opt
mkdir redis
chown vagrant:vagrant redis
cd redis
wget http://download.redis.io/releases/redis-2.8.0-rc5.tar.gz
tar xfvz redis-2.8.0-rc5.tar.gz --strip-components 1
make && make install
cd utils
echo "\n\n\n\n\n" | sudo ./install_server.sh

#src/redis-server --daemonize yes
#port 6379
#config /etc/redis/6379.conf
#log /var/log/redis_6379.log
#data directory /var/lib/redis/6379
#redis executable path /opt/redis/src/redis-server

# nodejs, includes npm and nodejs-dev
add-apt-repository -y ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get -y install nodejs
