import { Client } from 'pg';
import { AwsSecretsService } from './AWSSecretsService';

export class DBController {
  private client: Client;
  constructor() {
    const awsSecretsService = new AwsSecretsService();
    this.client = new Client({
      host: awsSecretsService.getSecretValue('DB_HOST'),
      port: awsSecretsService.getSecretValue('DB_PORT'),
      database: awsSecretsService.getSecretValue('DB_NAME'),
      user: awsSecretsService.getSecretValue('DB_USER'),
      password: awsSecretsService.getSecretValue('DB_PASSWORD'),
    });
  }

  public async connectDatabase(): Promise<void> {
    try {
      await this.client.connect();
    } catch (error) {
      console.error('Inside connectDatabase', error);
      throw error;
    }
  }

  public async disconnectDatabase(): Promise<void> {
    await this.client.end();
  }

  public async accessTableTemplate<T>(sqlQuery: string): Promise<T[]> {
    try {
      const res = await this.client.query(sqlQuery);
      return res.rows;
    } catch (error) {
      console.error('Inside accessTableTemplate', error);
      throw error;
    }
  }
}
