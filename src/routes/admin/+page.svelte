<script lang="ts">
  import type { User } from "$lib/oracle";
  import { onMount, tick } from "svelte";
  import { fade } from "svelte/transition";

  let mounted = false;
  onMount(() => {
    mounted = true;
  });

  async function getUsers(): Promise<User[]> {
    const res = await fetch("/api/user");
    const data = await res.json();

    return data;
  }
</script>

<div class="m-10 max-w-4xl">
  <div class="flex items-center space-x-4">
    <h2 class="text-2xl font-bold">Admin Dashboard</h2>

    <button
      class="flex items-center justify-between bg-blue-600 text-white font-bold px-2 py-1 rounded-md w-24"
      on:click={async () => {
        mounted = false;
        await tick();
        mounted = true;
      }}
    >
      <i class="fa-solid fa-arrows-rotate"></i>
      refresh
    </button>
  </div>

  {#if mounted}
    {#await getUsers()}
      <p class="font-bold text-xl animate-pulse my-2">Fetching Users...</p>
    {:then users}
      <ul transition:fade>
        {#each users as user}
          <li
            class=" text-xl bg-blue-600 bg-opacity-50 px-4 py-2 my-2 rounded-lg flex items-center justify-between"
          >
            <div class="flex items-center">
              <img
                src={user.avatar}
                alt={user.name}
                class="w-10 h-10 rounded-full inline-block mr-2 border-white border-4"
              />
              <p>{user.name}</p>
            </div>

            <p>{user.email}</p>
            <code class="font-bold">#{user.id}</code>
          </li>
        {/each}
      </ul>
    {:catch error}
      <p>{error.message}</p>
    {/await}
  {/if}
</div>
