import oracledb from 'oracledb'
import type { Auction, User } from './stores';

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT

// export async function wait(ms: number) {
//     await new Promise((resolve) => setTimeout(resolve, ms));
// }
export let dbConn: oracledb.Connection = null as any
export async function connectToDatabase(username: string, password: string) {
    console.log('attempting to connect')

    dbConn = await oracledb.getConnection({
        user: username,
        password,
        connectString: '0.0.0.0:1521/orcl12c'
    })
}


export function buildUser(user: any): User {
    let avatar = "";
    switch (user.AVATAR_ID) {
        case "PJFHUnsjudcmCIkt1":
        case "AFXAZdhysdLVrGoqB":
        case "AGUYAqwhtsKOZH36o":
            avatar = `${IMAGE_BASE}/pfps/${user.AVATAR_ID}.jpg`;
            break;
        default:
            avatar = `${DEFAULT_AVATAR_IMAGE_BASE}?seed=${user.AVATAR_ID}`;
            break;
    }
    
    return {
        user_id: user.USER_ID,
        name: user.NAME,
        avatar: {
            url: avatar,
            alt: user.CONTENT,
            image_id: ""
        },
        email: user.EMAIL
    }
}


const IMAGE_BASE: string = 'https://hazafatan.b-cdn.net'
const DEFAULT_AVATAR_IMAGE_BASE: string = 'https://api.dicebear.com/7.x/bottts-neutral/svg'
export async function fetchUsers(): Promise<User[]> {
    // console.log('fetching users');
    const result = await dbConn.execute(`SELECT * FROM USERS`)
    const users = result.rows as any[]
    return users.map(buildUser)
}


export function buildAuction(auction: any): Auction {
    let bid_state: 'listed' | 'delisted' | 'expired' | 'sold';
    switch (auction.BID_CODE) {
        case 1:
            bid_state = 'listed'
            break
        case 2:
            bid_state = 'delisted'
            break
        case 3:
            bid_state = 'expired'
            break
        case 4:
            bid_state = 'sold'
            break
        default:
            bid_state = 'listed'
            break
    }

    return {
        item_id: auction.ITEM_ID,
        seller_id: auction.SELLER_ID,
        current_bid: auction.CURRENT_BID || 0,
        buyout_price: auction.BUYOUT_PRICE || 0, 
        expiry: auction.EXPIRY,
        bid_state
    }
}

export async function fetchAuctions(): Promise<Auction[]> {
    // console.log('fetching auctions');
    const result = await dbConn.execute(`SELECT * FROM AUCTION`)
    const auctions = result.rows as any[]
    return auctions.map(buildAuction)
}

export async function fetchImages(): Promise<any[]> {
    // console.log('fetching images');
    const result = await dbConn.execute(`SELECT * FROM IMAGES`)
    return result.rows as any[]
}

export async function fetchBids(): Promise<any[]> {
    // console.log('fetching bids');
    const result = await dbConn.execute(`SELECT * FROM BIDS`)
    return result.rows as any[]
}

export async function fetchItemInfo(): Promise<any[]> {
    // console.log('fetching item info');
    const result = await dbConn.execute(`SELECT * FROM ITEM_INFO`)
    return result.rows as any[]
}

