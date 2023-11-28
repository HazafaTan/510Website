<script lang="ts">
  import { users, auctions, item_info, images, bids, ready } from "$lib/stores";
  import Table from "./table.svelte";
</script>

<div class="max-w-4xl">
  <div class="flex items-center space-x-4">
    <h2 class="text-2xl font-bold">Admin Dashboard</h2>

    <button
      class="flex items-center justify-between bg-blue-600 text-white font-bold px-2 py-1 rounded-md w-24"
      on:click={async () => {
        ready.set(false);
      }}
    >
      <i class="fa-solid fa-arrows-rotate"></i>
      refresh
    </button>
  </div>

  {#if $ready}
    <Table store={users} title="Users" />
    <Table store={auctions} title="Auctions" />
    <Table store={item_info} title="Item Info" />
    <Table store={images} title="Images" />
    <Table store={bids} title="Bids" />
  {:else}
    <p class="font-bold text-xl animate-pulse my-2">Fetching Users...</p>
  {/if}
</div>
