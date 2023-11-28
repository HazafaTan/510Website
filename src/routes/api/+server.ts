import { getImages, getBids, getUsers, getAuctions, getItemInfo } from '$lib/db'
import { JSONResponse } from './lib';

export async function GET() {
    const images = getImages();
    const bids = getBids();
    const users = getUsers();
    const auctions = getAuctions();
    const item_info = getItemInfo();

    return JSONResponse({
        images,
        bids,
        users,
        auctions,
        item_info
    });
}