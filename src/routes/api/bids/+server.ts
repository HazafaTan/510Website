import {  getBids } from '$lib/db';
import { dbConn } from '$lib/oracle.js'
import { JSONResponse } from '../lib';

export async function GET() {
  return JSONResponse(getBids());
}

export async function POST({request}) {
    const payload = await request.json();
  
    const {
       item_id, user_id, bid_amount
    } = payload;

    await dbConn.execute(
      `INSERT INTO BIDS VALUES (:item_id, :user_id, :bid_amount)`,
        [item_id, user_id, bid_amount],
        { autoCommit: true }
    );

    await new Promise(r => setTimeout(r, 2000));

    // get the highest bid
    const bids = getBids();
    let highestBid = 0;
    bids.forEach(bid => {
      if (bid.item_id === item_id && bid.bid_amount > highestBid) {
        highestBid = bid.bid_amount;
      }
    });

    // update the auction
    dbConn.execute(
      `UPDATE AUCTION SET current_bid = :bid_amount WHERE item_id = :item_id`,
        [highestBid, item_id],
        { autoCommit: true }
    );

    return new Response();
  }


export async function DELETE({request}) {
    const payload = await request.json();
  
    const {
        item_id, user_id
    } = payload;

    await dbConn.execute(
      `DELETE FROM BIDS WHERE item_id = :item_id AND user_id = :user_id`,
        [item_id, user_id],
        { autoCommit: true }
    );

    await new Promise(r => setTimeout(r, 2000));

    // get the highest bid
    const bids = getBids();
    let highestBid = 0;
    bids.forEach(bid => {
      if (bid.item_id === item_id && bid.bid_amount > highestBid) {
        highestBid = bid.bid_amount;
      }
    });

    // update the auction
    dbConn.execute(
      `UPDATE AUCTION SET current_bid = :bid_amount WHERE item_id = :item_id`,
        [highestBid, item_id],
        { autoCommit: true }
    );

    return new Response();
  }


export async function PATCH({request}) {
    const payload = await request.json();
  
    const {
        item_id, user_id, bid_amount
    } = payload;

    await dbConn.execute(
      `UPDATE BIDS SET bid_amount = :bid_amount WHERE item_id = :item_id AND user_id = :user_id`,
        [bid_amount, item_id, user_id],
        { autoCommit: true }
    );


    // wait for 2 seconds
    await new Promise(r => setTimeout(r, 2000));

    // get the highest bid
    const bids = getBids();
    let highestBid = 0;
    bids.forEach(bid => {
      if (bid.item_id === item_id && bid.bid_amount > highestBid) {
        highestBid = bid.bid_amount;
      }
    });

    // update the auction
    dbConn.execute(
      `UPDATE AUCTION SET current_bid = :bid_amount WHERE item_id = :item_id`,
        [highestBid, item_id],
        { autoCommit: true }
    );

    return new Response();
  }