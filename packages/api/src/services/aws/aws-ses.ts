import {
  SESClient,
  SendEmailCommand,
  SendEmailCommandInput,
} from "@aws-sdk/client-ses";
import { aws_credentials } from "../../config/aws";

// AWS SES configuration
export class AWSEmailService {
  protected sesClient: SESClient;
  constructor() {
    this.sesClient = new SESClient({
      region: process.env.AWS_REGION,
      credentials: {
        ...aws_credentials,
      },
    });
  }

  getParams = (
    subject: string,
    body: any,
    recipient: string[],
    source = "naetechween@gmail.com"
  ): SendEmailCommandInput => {
    return {
      Destination: {
        ToAddresses: recipient,
      },
      Message: {
        Body: {
          Text: {
            Data: body,
          },
        },
        Subject: {
          Data: subject,
        },
      },
      Source: source, // Replace with your verified sender email address
    };
  };

  sendEmailNotification = async (
    subject: string,
    message: string,
    recipient: string,
    senderAddress?: string
  ) => {
    const params = this.getParams(subject, message, [recipient]);
    const command = new SendEmailCommand(params);
    const result = await this.sesClient.send(command);
    return result;
  };
}
