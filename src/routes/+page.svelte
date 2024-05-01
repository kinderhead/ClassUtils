<script lang="ts">
    import { shuffle } from '$lib';
    import { Button, Table, TableBody, TableBodyCell, TableBodyRow, Input, Label } from 'flowbite-svelte';
    
    export let data;

    var selected = -1;
    var pairs: string[][] = [];

    function save() {
        window.localStorage.setItem("classes", JSON.stringify(data.classes));
    }

    function genPairs() {
        var people = [...data.classes[selected].people];
        shuffle(people);
        pairs = [];

        for (let i = 0; i < people.length; i++) {
            if (i == 0) pairs.push([people[i], people[people.length - 1]]);
            else pairs.push([people[i], people[i - 1]]);
        }

        pairs = pairs;
        console.log(pairs);
    }

    if (data.classes.length == 0) {
        data.classes = [{name: "Untitled Class", people: []}];
    } else {
        selected = 0;
    }

    console.log(data.classes);
</script>

<div class="h-full w-48 fixed z-10 top-0 left-0 bg-gradient-to-r bg-gray-700 text-center">
    {#each data.classes as cls, i}
        <button class="pl-8 pr-8 pt-3 pb-4 mb-1 w-full transition ease-in-out hover:bg-slate-500 break-words" on:click={() => {
            console.log(cls.name, selected);
            selected = i;
        }}>{cls.name}</button>
    {/each}
    
    <Button pill class="!p-2" color="green" outline on:click={() => {
        data.classes = [...data.classes, {name: "Untitled Class", people: []}];
        selected = data.classes.length - 1;
        pairs = [];
        save();
    }}>
        <svg class="w-6 h-6 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
        </svg>
    </Button>
</div>

<div class="ml-48 w-full grid grid-cols-randomizer">
    {#if selected != -1}
        <div class="mr-2 h-full">
            <div class="w-64 ml-4 mt-4 mb-2">
                <Label for="name" class="block text-sm mb-2">Class Name</Label>
                <Input id="name" bind:value={data.classes[selected].name} on:change={() => save()}/>
            </div>
            <div class="ml-4">
                <Button color="red" on:click={() => {
                    data.classes.splice(selected, 1)
                    data.classes = data.classes;
                    selected--;
                    save();
                }}>Delete</Button>
            </div>
        </div>
        <div>
            <Table id="students">
                <TableBody>
                    {#each data.classes[selected].people as i, idex}
                        <TableBodyRow>
                            <TableBodyCell>
                                <input bind:value={data.classes[selected].people[idex]} on:change={() => save()} class="w-full bg-transparent outline-none focus:border-b-2"/>
                            </TableBodyCell>
                            <TableBodyCell>
                                <Button class="m-0" color="red" on:click={() => {
                                    data.classes[selected].people.splice(idex, 1);
                                    data.classes[selected].people = data.classes[selected].people;
                                    save();
                                }}>Remove</Button>
                            </TableBodyCell>
                        </TableBodyRow>
                    {/each}
                </TableBody>
            </Table>
            <Button pill class="!p-2 mt-4" color="green" outline on:click={() => {
                data.classes[selected].people = [...data.classes[selected].people, "Student"];
                save();
            }}>
                <svg class="w-6 h-6 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
                </svg>
            </Button>
        </div>
        <div class="ml-2">
            {#if pairs.length != 0}
                <Table>
                    <TableBody>
                        {#each pairs as pair}
                            <TableBodyRow>
                                <TableBodyCell>{pair[0]}</TableBodyCell>
                                <TableBodyCell>{pair[1]}</TableBodyCell>
                            </TableBodyRow>
                        {/each}
                    </TableBody>
                </Table>
            {/if}
            <Button color="green" class="mb-2 br-2 mt-2" on:click={() => genPairs()}>Generate Pairs</Button>
        </div>
    {/if}
</div>
