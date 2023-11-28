import { getImages } from '$lib/db';
import { JSONResponse } from '../lib';

export async function GET() {
  return JSONResponse(getImages());
}
