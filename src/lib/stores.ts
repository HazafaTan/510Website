import { get, writable, type Writable } from "svelte/store"
import { cache } from "./cache"

export type Bid = {
    item_id: number
    user_id: number
    bid_amount: number
}

export type Image = {
    url: string
    alt: string
}

export type User = {
    user_id: number
    name: string
    avatar: Image
    email: string
}

export type BidState = 'listed' | 'delisted' | 'expired' | 'sold'

export type Auction = {
    item_id: number
    seller_id: number
    current_bid: number
    buyout_price: number
    expiry: Date
    bid_state: BidState
}

export type ItemInfo = {
    name: string
    description: string
    image_id: string
}


export const images = cache<{ [key: string]: Image }>({}, async () => {
    const images = await fetch('/api/images').then(res => res.json());

    const imageMap: { [key: string]: Image } = {}
    images.filter((image: any) => image.CONTENT !== "https://hazafa.b-cdn.net/tmp.jpg").forEach((image: any) => {
        imageMap[image.IMAGE_ID] = {
            url: image.CONTENT,
            alt: image.ALT_TEXT
        }
    })

    return imageMap
}, 5000);


export const bids = cache<Bid[]>([], async () => {
    const bids = await fetch('/api/bids').then(res => res.json());
    return bids.map((bid: any) => ({
        item_id: bid.ITEM_ID,
        user_id: bid.USER_ID,
        bid_amount: bid.BID_AMOUNT
    }))
}, 1000);


export const users = cache<{ [key: number]: User }>({}, async () => {
    const users = await fetch('/api/users').then(res => res.json()) as User[];

    const userMap: { [key: string]: User } = {}
    users.forEach((user: User) => {
        userMap[user.user_id] = user
    })

    return userMap
}, 5000);


export const auctions = cache<{ [key: number]: Auction }>({}, async () => {
    const auctions = await fetch('/api/auctions').then(res => res.json()) as Auction[];

    const auctionMap: { [key: number]: Auction } = {}
    auctions.forEach((auction: Auction) => {
        auctionMap[auction.item_id] = auction
    })

    return auctionMap
}, 1000);


export const item_info = cache<{ [key: number]: ItemInfo }>({}, async () => {
    const item_info = await fetch('/api/iteminfo').then(res => res.json());

    const itemInfoMap: { [key: number]: ItemInfo } = {}
    item_info.forEach((itemInfo: any) => {
        itemInfoMap[itemInfo.ITEM_ID] = {
            name: itemInfo.NAME,
            description: itemInfo.DESCRIPTION,
            image_id: itemInfo.IMAGE_ID
        }
    })

    return itemInfoMap
}, 5000);




export const ready = writable(false);
// Promise.all([images.ready, item_info.ready, auctions.ready, bids.ready, users.ready]).then(() => {
//     ready.set(true)
// });


async function checkReady() {
    if (get(images.ready) && get(item_info.ready) && get(auctions.ready) && get(bids.ready) && get(users.ready)) {
        ready.set(true)
    }

    setTimeout(checkReady, 500)
}

checkReady()