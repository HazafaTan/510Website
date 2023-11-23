import { dbConn, getAuctions } from '$lib/oracle.js'
import { JSONResponse } from '../lib';

export async function GET() {
  const users = await getAuctions();
  return JSONResponse(users);
}

export async function PUT({request}) {
  const payload = await request.json();

  const {
    item_id, current_bid, buyout_price, bid_code, expiry
  } = payload;

  let code = 1;
  switch (bid_code) {
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