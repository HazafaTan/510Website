import { browser } from "$app/environment";
import { writable } from "svelte/store";

export function cache<T>(initial: T, refresh: () => Promise<T>, delay = 2000) {
    const ready = writable(false);

    const { subscribe, set, update } = writable(initial);

    function ref() {
        if (browser) {
            refresh().then((data) => {
                set(data);
                ready.set(true);
            });
        }
    }
    
    ref();
    setInterval(ref, delay)

    return {
        subscribe,
        set,
        update,
        refresh: ref,
        ready
    }
}