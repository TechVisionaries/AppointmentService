variable "ecr_repository_url" {
  description = "The URL of the ECR repository containing the Docker image."
  type        = string
}

variable "subnets" {
  description = "List of subnet IDs for the ECS service."
  type        = list(string)
}

variable "security_groups" {
  description = "List of security group IDs for the ECS service."
  type        = list(string)
}