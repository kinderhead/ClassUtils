import type { PageLoad } from './$types';

export const load = (async ({ url }) => {
    return {
        pairs: JSON.parse(url.searchParams.get("pairs") as string) as string[][]
    };
}) satisfies PageLoad;
