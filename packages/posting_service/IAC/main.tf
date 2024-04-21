data "aws_iam_policy_document" "assume_role" {
  statement {
    effect = "Allow"
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

data "aws_iam_policy_document" "cloudwatch_policy" {
 statement {
    effect = "Allow"
    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents" 
      ]
    resources = ["arn:aws:logs:*:*:*"]  // Allows access to all CloudWatch Logs resources
  }
}

data "archive_file" "lambda" {
  type        = "zip"
  source_dir  = "../files"
  output_path = "lambda_function_payload.zip"
}


resource "aws_iam_role" "iam_for_lambda" {
  name               = "${var.projectname}_iam_for_lambda"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

# Attach CloudWatch policy to IAM role
resource "aws_iam_role_policy" "cloudwatch_policy" {
  name   = "cloudwatch_lambda_policy"
  role   = aws_iam_role.iam_for_lambda.id
  policy = data.aws_iam_policy_document.cloudwatch_policy.json
}

resource "aws_lambda_function" "test_lambda" {
  filename      = "lambda_function_payload.zip"
  function_name = "${var.projectname}_lambda"
  description   = "posting service for rox-ai"
  role          = aws_iam_role.iam_for_lambda.arn
  handler       = "dist/app.handler"
  runtime       = "nodejs20.x"
  timeout       = 5
  memory_size   = 200
  source_code_hash = data.archive_file.lambda.output_base64sha256
}