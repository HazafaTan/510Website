import { getUsers } from '$lib/oracle.js'
import { JSONResponse } from '../lib';

export async function GET() {
  const users = await getUsers();
  return JSONResponse(users);
}
