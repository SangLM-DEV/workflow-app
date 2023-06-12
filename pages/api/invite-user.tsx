import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/util/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { db, client } = await connectToDatabase();

  if (client.isConnected()) {
    const requestType = req.method;

    switch (requestType) {
      case 'PATCH': {
        const { email, boardId } = req.body;
        const user = await db.collection('users').findOne({ email });
        const boardData = await db.collection('boards').findOne({ _id: boardId });

        const isExistingUser = boardData.users.indexOf(user._id);

        if (isExistingUser > -1) {
          res.status(400).send({ message: 'Người dùng đã được thêm vào bảng.' });
        } else {
          const board = await db
            .collection('boards')
            .updateOne({ _id: boardId }, { $push: { users: user?._id } });

          if (board) {
            res.send({ status: 200, message: 'Được mời' });
          } else {
            res.send({ status: 404, message: 'Một số vấn đề' });
          }
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
