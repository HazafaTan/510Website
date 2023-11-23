import { createTunnel } from 'tunnel-ssh'

const port = 1521

const tunnelOptions = {
    autoClose: false
}
const serverOptions = {
    port: port
}

const forwardOptions = {
    srcAddr: '0.0.0.0',
    srcPort: port,
    dstAddr: 'oracle.scs.ryerson.ca',
    dstPort: port
}
export async function runTunnel(username: string, password: string) {
    try {
        const sshOptions = {
            host: 'moon.scs.ryerson.ca',
            port: 22,
            username,
            password
        }
        let [server, conn] = await createTunnel(
            tunnelOptions,
            serverOptions,
            sshOptions,
            forwardOptions
        )
        server.on('error', (e) => {
            console.log(e)
        })

        conn.on('error', (e: any) => {
            console.log(e)
        })

        server.on('listening', () => {
            console.log('listening')
        })

        conn.on('ready', () => {
            console.log('conn ready')
        })

        server.on('connection', (_connection) => {
            console.log('new connection')
        })

        console.log('tunnel created', server)
    } catch (e) {
        if ((e as any).code == 'EADDRINUSE') {
            return
        }
    }
}
