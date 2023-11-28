<script lang="ts">
  import { images, item_info, auctions, bids, users, ready } from "$lib/stores";
</script>

<h1 class="text-2xl font-bold mb-4 flex items-center space-x-2">
  <i class="fa-solid fa-circle text-red-500 animate-pulse mr-1"></i> Live
  Auctions
  <button
    class="text-base flex items-center justify-between bg-blue-600 text-white font-bold px-2 py-1 rounded-md w-24"
    on:click={async () => {
      ready.set(false);
    }}
  >
    <i class="fa-solid fa-arrows-rotate"></i>
    refresh
  </button>
</h1>

<div
  class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
>
  {#if $ready}
    {#each Object.values($auctions) as { item_id, current_bid, expiry, bid_state }}
      {@const info = $item_info[item_id]}
      {@const image = $images[info.image_id]}

      <a href="/car/{item_id}">
        <div
          class="w-full max-w-sm border rounded-lg shadow bg-gray-800 border-gray-700 flex flex-col justify-between overflow-hidden relative"
        >
          <img class="h-48 w-96 object-cover" src={image.url} alt={image.alt} />

          <div
            class="absolute top-[10rem] left-[0.25rem] bg-red-500 text-white px-2 py-1 rounded-lg items-center flex space-x-3"
          >
            <span class="text-sm">
              <i class="fa-regular fa-clock opacity-60 mr-0.5"></i>
              {new Date(expiry).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </span>

            <span class="text-sm">
              <span class="opacity-60"> Bid </span>
              <span class="font-bold">
                ${current_bid.toLocaleString()}
              </span>
            </span>
          </div>

          <div class="p-2 mt-1">
            <h5 class="text-xl font-semibold tracking-tight text-gray-300 mb-2">
              {info.name}
            </h5>
            <p class="text-gray-400 text-sm truncate">
              {info.description}
            </p>
          </div>
        </div>
      </a>
    {/each}
  {:else}
    <p class="font-bold text-xl animate-pulse my-2">Fetching Auctions...</p>
  {/if}
</div>
