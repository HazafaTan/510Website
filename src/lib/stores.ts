import { get, writable} from "svelte/store"
import { cache } from "./cache"
import { browser } from "$app/environment"

export type Bid = {
    item_id: number
    user_id: number
    bid_amount: number
}

export type Image = {
    image_id: string
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
    item_id: number
    name: string
    description: string
    image_id: string
}

export const ready = writable(false);

export const images = writable<{ [key: string]: Image }>({})
export const bids = writable<Bid[]>([])
export const users = writable<{ [key: number]: User }>({})
export const auctions = writable<{ [key: number]: Auction }>({})
export const item_info = writable<{ [key: number]: ItemInfo }>({})

export const db = cache<{ 
    images: { [key: string]: Image },
    bids: Bid[],
    users: { [key: number]: User },
    auctions: { [key: number]: Auction },
    item_info: { [key: number]: ItemInfo }
}>({
    images: {},
    bids: [],
    users: {},
    auctions: {},
    item_info: {}
}, async () => {
    if (!browser) {
        return;
    }

    const result = await fetch('/api').then(res => res.json());

    images.set(result.images)
    bids.set(result.bids)
    users.set(result.users)

    auctions.set(result.auctions)
    item_info.set(result.item_info)

    ready.set(true);

    return result
}, 250);


export const refresh = () => {
    db.refresh();
}