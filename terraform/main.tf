provider "aws" {
    region = "us-east-1"
}

resource "aws_eip" "my_eip" {
    vpc = true
}

resource "aws_instance" "my_instance" {
    ami           = "ami-0c94855ba95c71c99"
    instance_type = "t2.micro"
    key_name      = "aws-node-api"
    security_groups = [
    "MyWebServerGroup"
    ]
    user_data = <<-EOF
    #!/bin/bash
    sudo yum -y update
    sudo yum -y install git
    curl -sL https://rpm.nodesource.com/setup_14.x | sudo bash -
    sudo yum -y install nodejs
    sudo npm install -g pm2
    sudo mkdir /home/ec2-user/hangman-api
    cd /home/ec2-user/hangman-api
    EOF
    tags = {
    Name = "tf-hangman-api"
    }
}

resource "aws_eip_association" "my_eip_assoc" {
  instance_id   = "i-0646185f9fff7261d"
  allocation_id = aws_eip.my_eip.id
}

resource "aws_ssm_parameter" "my_eip_param" {
  name  = "/myapp/eip"
  type  = "String"
  value = aws_eip.my_eip.public_ip
}
