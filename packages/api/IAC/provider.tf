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
  region                   = "${var.aws_region}"
  shared_credentials_files = ["~/.aws/credentials"]
  profile                  = "rox-deployment-keys"
}

provider "docker" {
    registry_auth {
        address  = local.aws_ecr_url
        username = data.aws_ecr_authorization_token.token.user_name
        password = data.aws_ecr_authorization_token.token.password
  }
}