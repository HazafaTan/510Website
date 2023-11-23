import { building } from '$app/environment';
import { runTunnel } from '$lib/sshTunnel';
import { DB_USER, DB_PASS, SSH_PASS } from '$env/static/private';
import { connectToDatabase } from '$lib/oracle';

if (!building) {  
    await runTunnel(DB_USER, SSH_PASS);
    await connectToDatabase(DB_USER, DB_PASS);             
}
