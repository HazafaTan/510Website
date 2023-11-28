import { getItemInfo } from '$lib/db';
import { dbConn } from '$lib/oracle.js'
import { JSONResponse } from '../lib';

export async function GET() {
  return JSONResponse(getItemInfo());
}

export async function POST({request}) {
    const payload = await request.json();
  
    const {
        item_id, name, description, image_id
    } = payload;

    dbConn.execute(
      `INSERT INTO ITEM_INFO VALUES (:item_id, :name, :description, :image_id)`,
        [item_id, name, description, image_id],
        { autoCommit: true }
    );
    return new Response();
  }

export async function DELETE({request}) {
    const payload = await request.json();
  
    const {
        item_id
    } = payload;

    dbConn.execute(
      `DELETE FROM ITEM_INFO WHERE item_id = :item_id`,
        [item_id],
        { autoCommit: true }
    );
    return new Response();
  }

export async function PATCH({request}) {
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