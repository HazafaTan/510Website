import { getBids } from '$lib/db';
import { JSONResponse } from '../lib';

export async function GET() {
  return JSONResponse(getBids());
}
