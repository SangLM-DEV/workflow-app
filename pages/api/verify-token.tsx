import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/util/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { token } = req.query;

  const { db, client } = await connectToDatabase();

  if (client.isConnected()) {
    const requestType = req.method;

    switch (requestType) {
      case 'GET': {
        const tokenValue = await db.collection('token').findOne({ token });

        if (tokenValue) {
          res.status(200).send({ message: 'Hợp lệ' });
        } else {
          res.status(404).send({ message: 'Không hợp lệ' });
        }

        break;
      }

      default:
        res.send({ message: 'Lỗi cơ sở dữ liệu' });
        break;
    }
  } else {
    res.send({ msg: 'Lỗi kết nối cơ sở dữ liệu', status: 400 });
  }
}
