resource "aws_iam_role" "iam_for_lambda" {
  name               = "iam_for_lambda_sheduler_fuction_${var.base_name}"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

# Attach CloudWatch policy to IAM role
resource "aws_iam_role_policy" "cloudwatch_policy" {
  name   = "cloudwatch_lambda_policy"
  role   = aws_iam_role.iam_for_lambda.id
  policy = data.aws_iam_policy_document.cloudwatch_policy.json
}

resource "aws_lambda_function" "test_lambda" {
  function_name = "sheduler_fuction_${var.base_name}"
  role          = aws_iam_role.iam_for_lambda.arn
  package_type  = "Image"
  image_uri     = docker_registry_image.helloworld.name
  architectures = ["x86_64"]
  timeout       = 10
  depends_on = [aws_ecr_repository.shedular]
}