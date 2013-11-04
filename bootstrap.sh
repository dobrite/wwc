#!/usr/bin/env bash

apt-get update

# build tool chain
apt-get install -y make build-essential

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
# could use chris-lea/redis-server
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

# nodejs, includes npm and nodejs-dev
add-apt-repository -y ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get -y install nodejs

cd /vagrant

# bower
#npm install -g bower

apt-get install -y git

# make the dev environment
make env
bin/initialize_cent_config
make ws &
bin/initialize_cent_projects
make dev
