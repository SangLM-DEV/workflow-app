import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/util/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { cardId, slug } = req.query;

  const { db, client } = await connectToDatabase();

  if (client.isConnected()) {
    const requestType = req.method;

    switch (requestType) {
      case 'GET': {
        res.send({ message: 'Nhận thêm thông tin chi tiết của thẻ' });
        return;
      }

      case 'DELETE': {
        await db.collection('cards').deleteOne({ _id: cardId });

        res.send({ message: 'Một thẻ đã bị xóa' });

        return;
      }

      case 'PATCH': {
        await db
          .collection('cards')
          .updateOne({ _id: cardId, boardId: slug }, { $set: { ...req.body } });

        res.send({ message: 'Đã cập nhật thẻ' });
        return;
      }

      default:
        res.send({ message: 'Lỗi cơ sở dữ liệu' });
        break;
    }
  } else {
    res.send({ msg: 'Lỗi kết nối cơ sở dữ liệu', status: 400 });
  }
}
