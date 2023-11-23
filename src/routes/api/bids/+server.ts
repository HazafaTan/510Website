import { getBids } from '$lib/oracle.js'
import { JSONResponse } from '../lib';

export async function GET() {
  const users = await getBids();
  return JSONResponse(users);
}
