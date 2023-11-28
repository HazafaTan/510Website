import { writable } from "svelte/store";

export function cache<T>(initial: T, refresh: () => Promise<T>, delay = 2000) {
    const { subscribe, set, update } = writable(initial);

    async function ref() {
        const result = await refresh();
        set(result);
    }
    
    ref();
    setInterval(ref, delay)

    return {
        subscribe,
        set,
        update,
        refresh: ref,
    }
}