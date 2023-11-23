import { building } from '$app/environment';
import { runTunnel } from '$lib/sshTunnel';
import { DB_USER, DB_PASS } from '$env/static/private';

if (!building) {                          
    await runTunnel(DB_USER, DB_PASS);
}
