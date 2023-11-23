import { dbConn, getItemInfo } from '$lib/oracle.js'
import { JSONResponse } from '../lib';

export async function GET() {
  const users = await getItemInfo();
  return JSONResponse(users);
}


export async function PUT({request}) {
    const payload = await request.json();
  
    const {
        item_id, name, description, image_id
    } = payload;

    dbConn.execute(
      `UPDATE ITEM_INFO SET name = :name, description = :description, image_id = :image_id WHERE item_id = :item_id`,
        [name, description, image_id, item_id],
        { autoCommit: true }
    );
    return new Response();
  }