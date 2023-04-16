provider "aws" {
    region = "us-east-1"
}

resource "aws_eip" "my_eip" {
    vpc = true

    tags = {
    Name = "node_api_eip"
  }
}

resource "aws_security_group" "word_guessr_api_sg" {
    name_prefix = "WordGuessrAPISecurityGroup"

  ingress {
    from_port = 22
    to_port   = 22
    protocol  = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port = 3001
    to_port   = 3001
    protocol  = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "WordGuessrAPISecurityGroup"
  }
}

resource "aws_instance" "my_instance" {
    ami           = "ami-0c94855ba95c71c99"
    instance_type = "t2.micro"
    key_name      = "aws-node-api"
    vpc_security_group_ids = [
        aws_security_group.word_guessr_api_sg.id
    ]
    user_data = file("setup.sh")
    tags = {
    Name = "tf-hangman-api"
    }
}

resource "aws_eip_association" "node_api_eip_assoc" {
  instance_id   = aws_instance.my_instance.id
  allocation_id = aws_eip.my_eip.id
}

resource "aws_ssm_parameter" "node_api_eip_param" {
  name  = "/node-api/eip"
  type  = "String"
  value = aws_eip.my_eip.public_ip

  tags = {
    Application = "node-api"
    Environment = "dev"
    Name        = "node-api-eip"
  }
}
