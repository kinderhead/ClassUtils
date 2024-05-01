<script lang="ts">
    import type { PageData } from "./$types";
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';

    export let data: PageData;

    var processed: {[student: string]: string[]} = {};

    $: for (const i of data.pairs) {
        if (!(i[0] in processed)) {
            processed[i[0]] = [];
        }
        if (!(i[1] in processed)) {
            processed[i[1]] = [];
        }
        processed[i[0]].push(i[1]);
        processed[i[1]].push(i[0]);
    }

    console.log(processed);
</script>

<Table>
    <TableHead>
        <TableHeadCell class="w-1/2">Student</TableHeadCell>
        <TableHeadCell>Partner 1</TableHeadCell>
        <TableHeadCell>Partner 2</TableHeadCell>
    </TableHead>
    <TableBody>
        {#each Object.entries(processed) as i}
            <TableBodyRow>
                <TableBodyCell>{i[0]}</TableBodyCell>
                <TableBodyCell>{i[1][0]}</TableBodyCell>
                <TableBodyCell>{i[1][1]}</TableBodyCell>
            </TableBodyRow>
        {/each}
    </TableBody>
</Table>
