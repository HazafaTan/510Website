import { get } from "svelte/store";
import { cache } from "./cache";
import { fetchAuctions, fetchBids, fetchImages, fetchItemInfo, fetchUsers } from "./oracle";
import  type {
    Auction,
    Bid,
    Image,
    User,
    ItemInfo
} from "./stores";

export const images = cache<{ [key: string]: Image }>({}, async () => {
    const images = await fetchImages();
    const imageMap: { [key: string]: Image } = {}
    images.filter((image: any) => image.CONTENT !== "https://hazafa.b-cdn.net/tmp.jpg").forEach((image: any) => {
        imageMap[image.IMAGE_ID] = {
            image_id: image.IMAGE_ID,
            url: image.CONTENT,
            alt: image.ALT_TEXT
        }
    })

    return imageMap
}, 1000);
export const getImages = () => get(images);
export const getImage = (id: string) => get(images)[id];


export const bids = cache<Bid[]>([], async () => {
    const bids = await fetchBids();
    return bids.map((bid: any) => ({
        item_id: bid.ITEM_ID,
        user_id: bid.USER_ID,
        bid_amount: bid.BID_AMOUNT
    }))
}, 1000);
export const getBids = () => get(bids);
export const getBidsByItemId = (id: number) => get(bids).filter((bid: Bid) => bid.item_id === id);
export const getBidsByUserId = (id: number) => get(bids).filter((bid: Bid) => bid.user_id === id);
export const getBid = (itemId: number, userId: number) => get(bids).find((bid: Bid) => bid.item_id === itemId && bid.user_id === userId);

export const users = cache<{ [key: number]: User }>({}, async () => {
    const users = await fetchUsers();

    const userMap: { [key: string]: User } = {}
    users.forEach((user: User) => {
        userMap[user.user_id] = user
    })

    return userMap
}, 1000);
export const getUsers = () => get(users);
export const getUser = (id: number) => get(users)[id];


export const auctions = cache<{ [key: number]: Auction }>({}, async () => {
    const auctions = await fetchAuctions();

    const auctionMap: { [key: number]: Auction } = {}
    auctions.forEach((auction: Auction) => {
        auctionMap[auction.item_id] = auction
    })

    return auctionMap
}, 1000);
export const getAuctions = () => get(auctions);
export const getAuction = (id: number) => get(auctions)[id];


export const item_info = cache<{ [key: number]: ItemInfo }>({}, async () => {
    const item_info = await fetchItemInfo();

    const itemInfoMap: { [key: number]: ItemInfo } = {}
    item_info.forEach((itemInfo: any) => {
        itemInfoMap[itemInfo.ITEM_ID] = {
            item_id: itemInfo.ITEM_ID,
            name: itemInfo.NAME,
            description: itemInfo.DESCRIPTION,
            image_id: itemInfo.IMAGE_ID
        }
    });

    return itemInfoMap
}, 1000);
export const getItemInfo = () => get(item_info);
export const getItemInfoById = (id: number) => get(item_info)[id];   
