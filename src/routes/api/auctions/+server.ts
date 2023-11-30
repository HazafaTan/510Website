import { dbConn } from '$lib/oracle.js'
import { getAuctions } from '$lib/db'
import { JSONResponse } from '../lib';

export async function GET() {
  return JSONResponse(getAuctions());
}

export async function PATCH({request}) {
  const payload = await request.json();

  const {
    item_id, current_bid, buyout_price, bid_state, expiry
  } = payload;

  let code = 1;
  switch (bid_state) {
    case 'listed':
      code = 1;
      break;
    case 'delisted':
      code = 2;
      break;
    case 'expired':
      code = 3;
      break;
    case 'sold':
      code = 4;
      break;
  }

  dbConn.execute(
    `UPDATE auction SET current_bid = :current_bid, buyout_price = :buyout_price, bid_code = :bid_code WHERE item_id = :item_id`,
    [current_bid, buyout_price, code, item_id],
    { autoCommit: true }
  );

  return new Response();
}