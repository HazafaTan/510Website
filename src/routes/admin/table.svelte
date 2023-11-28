<script lang="ts">
  import type { Writable } from "svelte/store";
  import { refresh } from "$lib/stores";

  export let store: Writable<any>;
  export let title = "Table";

  const path = title.toLowerCase().replace(" ", "");

  const first = Object.values($store)[0] || {};

  let editing: any = null;
  let temp: any = {};

  const cany = (x: any): any => x;

  async function request(method: string, data: any) {
    const res = await fetch(`/api/${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      console.log(method, title, data);
      refresh();
    }
  }
</script>

<h2 class="text-xl font-bold mt-4">
  {title} ({Object.keys($store).length})
</h2>

<div class="overflow-y-scroll h-[50rem]">
  <table class="w-full mt-2 table-auto border-gray-700 border">
    <thead class="uppercase bg-gray-700 text-gray-400">
      <tr>
        {#each Object.keys(first) as key}
          <th class="text-left p-1">{key}</th>
        {/each}
        <th class="text-left p-1"></th>
      </tr>
    </thead>

    <tbody class="text-gray-400">
      {#each Object.entries($store) as [id, row]}
        <tr
          class="item border-b bg-gray-800 border-gray-700 {editing === id
            ? 'bg-gray-700'
            : ''}"
        >
          {#if editing === id}
            {#each Object.entries(cany(row)) as [key, value]}
              <td class="text-left p-1">
                {#if typeof value === "object"}
                  <img
                    class="h-8 rounded-md"
                    src={cany(value).url}
                    alt={cany(value).alt}
                  />
                {:else}
                  <input
                    class="bg-gray-700 text-gray-400 w-full p-1"
                    type="text"
                    bind:value={temp[key]}
                  />
                {/if}
              </td>
            {/each}
          {:else}
            {#each Object.values(row || {}) as value}
              <td
                class="text-left p-1 {typeof value === 'number'
                  ? 'font-mono'
                  : ''} "
              >
                {#if typeof value === "object"}
                  <img class="h-8 rounded-md" src={value.url} alt={value.alt} />
                {:else}
                  {value}
                {/if}
              </td>
            {/each}
          {/if}

          <td class="text-right">
            {#if editing === null || editing === id}
              <button
                class="stuff bg-blue-600 text-white font-bold px-2 py-1 rounded-md w-10 hover:bg-blue-700 active:bg-blue-800 transition-colors duration-100"
                on:click={() => {
                  if (editing === id) {
                    editing = null;

                    request("PATCH", temp);
                  } else {
                    editing = id;

                    temp = {
                      ...cany(row),
                    };
                  }
                }}
              >
                <i class="fa-solid fa-pencil"></i>
              </button>

              {#if editing === id}
                <button
                  class="stuff bg-red-600 text-white font-bold px-2 py-1 rounded-md w-10 hover:bg-red-700 active:bg-red-800 transition-colors duration-100"
                  on:click={() => {
                    editing = null;

                    request("DELETE", temp);
                  }}
                >
                  <i class="fa-solid fa-trash"></i>
                </button>
              {/if}
            {/if}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .item:hover {
    background-color: #2d3748;
  }

  .stuff {
    visibility: hidden;
  }

  .item:hover .stuff {
    visibility: visible;
  }
</style>
