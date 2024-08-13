import dbConnect from '@/db/dbConnect';
import QRCode from '@/db/models/QRCode';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;
  switch (req.method) {
    case 'PATCH':
      const updateQRCode = await QRCode.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.send(updateQRCode);
      break;
    case 'GET':
      const qrCode = await QRCode.findById(id);
      res.send(qrCode);
      break;
    case 'DELETE':
      const deleteQRCode = await QRCode.findByIdAndDelete(id);
      res.status(204).send(deleteQRCode);
      break;
    default:
      res.send();
      break;
  }
}
