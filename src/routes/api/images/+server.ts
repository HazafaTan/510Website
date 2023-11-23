import { getImages } from '$lib/oracle.js'
import { JSONResponse } from '../lib';

export async function GET() {
  const users = await getImages();
  return JSONResponse(users);
}
