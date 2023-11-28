<script lang="ts">
  import {
    images,
    item_info,
    auctions,
    users,
    bids,
    ready,
    type ItemInfo,
    type Image,
  } from "$lib/stores";

  export let data: any;
  const item_id = data.slug;

  let description = "";
  let name = "";
  let current_bid = 0;
  let buyout_price = 0;

  let set = false;
  $: if (!set && $ready) {
    set = true;
    const info = $item_info[item_id];
    const image = $images[info.image_id];
    const auction = $auctions[item_id];

    description = info.description;
    name = info.name;
    current_bid = auction.current_bid;
    buyout_price = auction.buyout_price;
  }

  async function send() {
    await fetch(`/api/auctions`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...$auctions[item_id],
        item_id,
        current_bid,
        buyout_price,
      }),
    });

    await fetch(`/api/iteminfo`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...$item_info[item_id],
        item_id,
        description,
        name,
      }),
    });
  }
</script>

{#if $ready}
  {@const info = $item_info[item_id]}
  {@const image = $images[info.image_id]}
  {@const auction = $auctions[item_id]}
  {@const seller = $users[$auctions[item_id].seller_id]}

  <h1 class="text-2xl font-bold mb-4">
    <i class="fa-solid fa-circle text-red-500 animate-pulse mr-1"></i>
    <input
      class="text-2xl font-bold bg-transparent border-b-2 border-gray-700 focus:border-blue-500 w-96"
      bind:value={name}
    />
  </h1>

  <div>
    <span class="font-bold">Seller:</span>
    <div>
      <img
        src={seller.avatar.url}
        alt={seller.avatar.alt}
        class="w-10 h-10 rounded-full inline-block mr-2 border-white border-4"
      />
    </div>
  </div>

  <div class="flex flex-row space-x-8">
    <img class="rounded-lg w-96" src={image.url} alt={image.alt} />

    <div class="flex flex-col justify-between">
      <textarea
        class="w-full rounded-lg p-4 bg-gray-800 border-gray-700 border"
        bind:value={description}
      />

      <!-- {info.description} -->

      <div class="text-2xl">
        <div>
          <span class="font-bold">Current Bid:</span>
          <span class="font-bold">
            $<input
              type="number"
              class="bg-transparent border-b-2 border-gray-700 focus:border-blue-500"
              bind:value={current_bid}
            />
          </span>
        </div>

        <!-- class={auction.buyout_price === 0 ? "line-through text-gray-500" : ""} -->

        <div>
          <span class="font-bold">Buyout Price:</span>
          <span class="font-bold">
            $<input
              type="number"
              class="bg-transparent border-b-2 border-gray-700 focus:border-blue-500"
              bind:value={buyout_price}
            />
          </span>
        </div>

        <button
          class="bg-blue-600 text-white font-bold px-2 py-1 rounded-md w-24"
          on:click={send}
        >
          Edit
        </button>
      </div>
    </div>
  </div>
{:else}
  <p class="font-bold text-xl animate-pulse my-2">Fetching Data...</p>
{/if}
