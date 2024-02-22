terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }

    docker = {
      source  = "kreuzwerker/docker"
    }
  }
}

provider "aws" {
  region     = "eu-west-1"
  access_key = ""
  secret_key = ""
}

provider "docker" {
    registry_auth {
        address  = local.aws_ecr_url
        username = data.aws_ecr_authorization_token.token.user_name
        password = data.aws_ecr_authorization_token.token.password
  }
}