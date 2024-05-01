<script lang="ts">
    import { base } from '$app/paths';
    import { shuffle } from '$lib';
    import { Button, Table, TableBody, TableBodyCell, TableBodyRow, Input, Label, ButtonGroup, Modal } from 'flowbite-svelte';
    
    export let data;

    var selected = -1;
    var pairs: string[][] = [];

    var deleteClass = false;

    var files: FileList | undefined;
    var uploadElement: HTMLInputElement;

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

    $: if (files) {
        (async () => {
            data.classes = [...data.classes, JSON.parse(new TextDecoder().decode(await files[0].arrayBuffer()))];
            selected = data.classes.length - 1;
            pairs = [];
            save();
            files = undefined;
        })();
    }

    console.log(data.classes);
</script>

<div class="w-full h-screen grid grid-cols-randomizer">
    <div class="h-full max-w-48 bg-gray-700 text-center sticky flex flex-col">
        {#each data.classes as cls, i}
            <button class="pl-8 pr-8 pt-3 pb-4 mb-1 w-full transition ease-in-out hover:bg-slate-500 break-words" on:click={() => {
                console.log(cls.name, selected);
                selected = i;
            }}>{cls.name}</button>
        {/each}
        
        <div class="mx-auto flex gap-4">
            <Button pill class="!p-2 w-12 h-12" color="green" outline on:click={() => {
                data.classes = [...data.classes, {name: "Untitled Class", people: []}];
                selected = data.classes.length - 1;
                pairs = [];
                save();
            }}>
                <svg class="w-6 h-6 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
                </svg>
            </Button>
            <Button pill class="!p-2 w-12 h-12" color="blue" outline on:click={() => {
                uploadElement.click();
            }}>
                <svg class="w-6 h-6 text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v9m-5 0H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2M8 9l4-5 4 5m1 8h.01"/>
                </svg>
            </Button>
            <input type="file" style="display:none;" bind:this={uploadElement} bind:files={files} />
        </div>
    </div>
    {#if selected != -1}
        <div class="mr-2 h-full">
            <div class="w-64 ml-4 mt-4 mb-2">
                <Label for="name" class="block text-sm mb-2">Class Name</Label>
                <Input id="name" bind:value={data.classes[selected].name} on:change={() => save()}/>
            </div>
            <ButtonGroup class="ml-4">
                <Button color="blue" on:click={() => {
                    var a = document.createElement("a");
                    document.body.append(a);
                    a.download = data.classes[selected].name + ".json";
                    a.href = URL.createObjectURL(new Blob([JSON.stringify(data.classes[selected])]));
                    a.click();
                    a.remove();
                }}>Download</Button>
                <Button color="red" on:click={() => {deleteClass = true}}>Delete</Button>
            </ButtonGroup>
            <Modal bind:open={deleteClass} size="xs" autoclose>
                <div class="text-center">
                    <h3 class="mb-5 text-lg font-normal">Permanently delete "{data.classes[selected].name}"?</h3>
                    <Button color="red" class="me-2" on:click={() => {
                        data.classes.splice(selected, 1)
                        data.classes = data.classes;
                        selected--;
                        save();
                        deleteClass = false;
                    }}>Yes</Button>
                    <Button color="alternative">No</Button>
                </div>
            </Modal>
        </div>
        <div>
            <Table id="students" shadow>
                <TableBody>
                    {#each data.classes[selected].people as i, idex}
                        <TableBodyRow>
                            <TableBodyCell>
                                <input bind:value={data.classes[selected].people[idex]} on:change={() => save()} class="w-full bg-transparent outline-none focus:border-b-2"/>
                            </TableBodyCell>
                            <TableBodyCell class="text-right">
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
            <Button pill class="!p-2 mt-4 w-12 h-12" color="green" outline on:click={() => {
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
                <Table color="indigo" shadow>
                    <TableBody>
                        {#each pairs as pair}
                            <TableBodyRow>
                                <TableBodyCell class="h-16 text-center">{pair[0]} - {pair[1]}</TableBodyCell>
                            </TableBodyRow>
                        {/each}
                    </TableBody>
                </Table>
            {/if}
            <ButtonGroup class="my-2 mr-2 text-center">
                <Button color="green" on:click={() => genPairs()}>Generate Pairs</Button>
                {#if pairs.length != 0}
                    <Button color="primary" on:click={() => {
                        window.open(`${base}/pairs?${new URLSearchParams({pairs: JSON.stringify(pairs)}).toString()}`, "_blank");
                    }}>Display in new tab</Button>
                    <Button color="yellow" on:click={() => {
                        var text = "";
                        for (const i of pairs) {
                            text += i[0] + " - " + i[1] + "\n";
                        }
                        navigator.clipboard.writeText(text);
                    }}>
                        Copy
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-6 5h6m-6 4h6M10 3v4h4V3h-4Z"/>
                        </svg>
                    </Button>
                {/if}
            </ButtonGroup>
        </div>
    {/if}
</div>
