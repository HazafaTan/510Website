<script lang="ts">
  import { images, item_info, auctions, bids, users, ready } from "$lib/stores";
</script>

<h1 class="text-2xl font-bold mb-4">
  <i class="fa-solid fa-circle text-red-500 animate-pulse mr-1"></i> Live Auctions
</h1>

<div
  class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
>
  {#if $ready}
    {#each Object.values($auctions) as { item_id, seller_id, current_bid, buyout_price, expiry, bid_state }}
      {@const info = $item_info[item_id] || {}}
      {@const image = $images[info.image_id] || {}}
      <div
        class="w-full max-w-sm border rounded-lg shadow bg-gray-800 border-gray-700 flex flex-col justify-between"
      >
        <a href="/car/{item_id}">
          <img class="rounded-t-lg" src={image.url} alt={image.alt} />
        </a>
        <div class="px-5 pb-5 mt-4">
          <a href="/car/{item_id}">
            <h5 class="text-xl font-semibold tracking-tight text-gray-300 mb-2">
              {info.name}
            </h5>
          </a>

          <div class="flex items-center justify-between">
            <span class="text-3xl font-bold text-gray-900 dark:text-white"
              >${current_bid.toLocaleString()}</span
            >
            <a
              href="/car/{item_id}"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >Edit</a
            >
          </div>
        </div>
      </div>
    {/each}
  {:else}
    <p class="font-bold text-xl animate-pulse my-2">Fetching Auctions...</p>
  {/if}
</div>
