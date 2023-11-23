<script lang="ts">
  import { users } from "$lib/stores";
  import { tick } from "svelte";
  import { fade } from "svelte/transition";

  const ready = users.ready;
</script>

<div class="max-w-4xl">
  <div class="flex items-center space-x-4">
    <h2 class="text-2xl font-bold">Admin Dashboard</h2>

    <button
      class="flex items-center justify-between bg-blue-600 text-white font-bold px-2 py-1 rounded-md w-24"
      on:click={async () => {
        ready.set(false);
        await tick();
        users.refresh();
      }}
    >
      <i class="fa-solid fa-arrows-rotate"></i>
      refresh
    </button>
  </div>

  {#if $ready}
    <ul transition:fade>
      {#each Object.entries($users) as [id, user]}
        <li
          class=" text-xl bg-blue-600 bg-opacity-50 px-4 py-2 my-2 rounded-lg flex items-center justify-between"
        >
          <div class="flex items-center">
            <img
              src={user.avatar.url}
              alt={user.avatar.alt}
              class="w-10 h-10 rounded-full inline-block mr-2 border-white border-4"
            />
            <p>{user.name}</p>
          </div>

          <p>{user.email}</p>
          <code class="font-bold">#{id}</code>
        </li>
      {/each}
    </ul>
  {:else}
    <p class="font-bold text-xl animate-pulse my-2">Fetching Users...</p>
  {/if}
</div>
