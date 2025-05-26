import { dbConnect } from '@/lib/db';
import Contact from '@/models/Contact';
import { API_ERROR_MESSAGES, HTTP_STATUS } from '@/api/config';

export async function GET() {
  await dbConnect();
  const doc = await Contact.findOne();
  if (!doc) {
    return Response.json(
      { error: API_ERROR_MESSAGES.DATA_NOT_FOUND },
      { status: HTTP_STATUS.NOT_FOUND }
    );
  }
  return Response.json(doc);
}
