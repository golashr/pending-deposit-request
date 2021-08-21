import { Buffer } from 'buffer';
import { SecretsManager, GetSecretValueResponse } from 'aws-sdk/clients';
import { Logger } from '@abx/logging-utils';

const logger = Logger.getInstance('reCaptcha', 'GoogleReCaptcha');

export class AwsSecretsService {
  private secretClient = new SecretsManager({
    region: 'ap-southeast-2',
  });

  public async getSecretValue(secretName: string): Promise<string> {
    logger.info(`Aws Secret value ${secretName}`);
    try {
      const data: GetSecretValueResponse =
        await this.secretClient.getSecretValue({
          SecretId: secretName,
        });
      if ('SecretString' in data) {
        return data.SecretString;
      } else if ('SecretBinary' in data) {
        let buff = Buffer.from(data.SecretBinary, 'base64');
        return buff.toString('ascii');
      }
    } catch (err) {
      if (err.code === 'DecryptionFailureException')
        // Secrets Manager can't decrypt the protected secret text using the provided KMS key.
        // Deal with the exception here, and/or rethrow at your discretion.
        throw err;
      else if (err.code === 'InternalServiceErrorException')
        // An error occurred on the server side.
        // Deal with the exception here, and/or rethrow at your discretion.
        throw err;
      else if (err.code === 'InvalidParameterException')
        // You provided an invalid value for a parameter.
        // Deal with the exception here, and/or rethrow at your discretion.
        throw err;
      else if (err.code === 'InvalidRequestException')
        // You provided a parameter value that is not valid for the current state of the resource.
        // Deal with the exception here, and/or rethrow at your discretion.
        throw err;
      else if (err.code === 'ResourceNotFoundException')
        // We can't find the resource that you asked for.
        // Deal with the exception here, and/or rethrow at your discretion.
        throw err;
    }
    return '';
  }
}
