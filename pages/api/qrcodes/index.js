import dbConnect from '@/db/dbConnect';
import QRCode from '@/db/models/QRCode';

export default async function handler(req, res) {
  await dbConnect();
  switch (req.method) {
    case 'POST':
      const newQRCode = await QRCode.create(req.body);
      res.status(201).send(newQRCode);
      break;
    case 'GET':
      const QRCodes = await QRCode.find();
      res.send(QRCodes);
      break;
    default:
      res.status(404).send();
      break;
  }
}
