variable "aws_region" {
  type        = string
  default     = "eu-west-1"
  description = "aws region for current resource"
}

variable "base_name" {
  type = string
  default = "rox_sheduled_posting"
}