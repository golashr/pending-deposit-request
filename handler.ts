import { SELECT_PENDING_DEPOSIT_REQUESTS } from './SQL';
import { DepositRequest } from './model';
import { DBController } from './lib';

module.exports.run = async () => {
  let controller: DBController;
  try {
    controller = new DBController();
    await controller.connectDatabase();
    const depositRequest = await controller.accessTableTemplate<DepositRequest>(
      SELECT_PENDING_DEPOSIT_REQUESTS
    );
    console.log('pending deposit requests', JSON.stringify(depositRequest));
    controller.disconnectDatabase();
  } catch (error) {
    console.error('Error raised', error);
  }
};
