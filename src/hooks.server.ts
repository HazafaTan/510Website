import { building } from '$app/environment'; // <---- here
import { runTunnel } from '$lib/sshTunnel';

const runAllTheInitFunctions = async () => {
    await runTunnel('','')

}

if (!building) {                             // <---- here
    await runAllTheInitFunctions();
}
