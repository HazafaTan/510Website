import oracledb from 'oracledb'

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT

export async function wait(ms: number) {
    await new Promise((resolve) => setTimeout(resolve, ms));
}
export let dbConn: oracledb.Connection = null as any
export async function connectToDatabase(username: string, password: string) {
    console.log('attempting to connect')

    dbConn = await oracledb.getConnection({
        user: username,
        password,
        connectString: '0.0.0.0:1521/orcl12c'
    })
}

export type DBUser = {
    USER_ID: number
    NAME: string
    AVATAR_ID: string
    EMAIL: string
}

export type User = {
    id: number
    name: string
    avatar: string
    email: string
}

export type DBImage = {
    IMAGE_ID: string
    ALT_TEXT: string
    CONTENT: string
}

const IMAGE_BASE: string = 'https://hazafatan.b-cdn.net'
const DEFAULT_AVATAR_IMAGE_BASE: string = 'https://api.dicebear.com/7.x/bottts-neutral/svg'
export async function getUsers(): Promise<User[]> {
    const result = await dbConn.execute(`SELECT * FROM USERS`)
    const users = result.rows as DBUser[]

    await wait(1000);

    return users.map((user) => {
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
            id: user.USER_ID,
            name: user.NAME,
            avatar,
            email: user.EMAIL
        }
    });
}