import type { PageLoad } from './$types';

export const load = (async () => {
    console.log("test");
    return {};
}) satisfies PageLoad;

export const ssr = false;
