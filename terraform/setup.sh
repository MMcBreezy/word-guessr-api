#!/bin/bash
sudo yum -y update
sudo yum -y install git
curl -sL https://rpm.nodesource.com/setup_14.x | sudo bash -
sudo yum -y install nodejs
sudo npm install -g nodemon
sudo mkdir /home/ec2-user/hangman-api
cd /home/ec2-user/hangman-api