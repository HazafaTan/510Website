import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export function state<T>(initial: T, id?: string, delay = 500) {
	if (id === undefined) {
		id = hash(initial);
	}

	let local = null;
	if (browser) {
		local = getFromLocalStorage(id);
		if (local === null) {
			setToLocalStorage(id, initial);
		}
	}

	const { subscribe, set, update } = writable(local || initial);
	const debouncedSet = debounce(setToLocalStorage, delay);

	return {
		subscribe,
		set: (value: T) => {
			if (browser) debouncedSet(id, value);
			set(value);
		},
		update: (fn: (value: T) => T) => {
			update((current) => {
				const value = fn(current);
				if (browser) debouncedSet(id, value);
				return value;
			});
		},
		reset: () => set(initial)
	};
}

function getFromLocalStorage(key: string): any | null {
	const item = localStorage.getItem(key);
	return item ? JSON.parse(item) : null;
}

function setToLocalStorage(key: string, value: any) {
	const item = JSON.stringify(value);
	localStorage.setItem(key, item);
}

//@ts-ignore
function debounce(fn, delay) {
    //@ts-ignore
	let timeoutID = null;
    //@ts-ignore
    return function (...args) {
        //@ts-ignore
        clearTimeout(timeoutID);
		timeoutID = setTimeout(() => fn(...args), delay);
	};
}

function hash(obj: any) {
	return JSON.stringify(obj)
		.split('')
		.reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0)
		.toString(16);
}