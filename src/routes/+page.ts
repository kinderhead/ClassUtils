import type Class from '$lib/class';
import type { PageLoad } from './$types';

export const load = (async () => {
    var data = window.localStorage.getItem("classes");
    if (!data) data = "[]";
    return {
        classes: JSON.parse(data) as Class[]
    };
}) satisfies PageLoad;

export const ssr = false;
