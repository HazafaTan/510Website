<script lang="ts">
  import {
    images,
    item_info,
    auctions,
    users,
    ready,
    bids,
    refresh,
  } from "$lib/stores";

  export let data: any;
  const item_id = parseInt(data.slug);

  const ADMIN_ID = 27382835;
  $: prevBid = $bids.find(
    (bid) => bid.item_id === item_id && bid.user_id === ADMIN_ID
  );

  let bid_amount = prevBid ? prevBid.bid_amount : 0;
  async function makeBid() {
    if (bid_amount <= $auctions[item_id].current_bid) {
      alert("Bid amount must be greater than current bid");
      return;
    }

    const res = await fetch(`/api/bids`, {
      method: prevBid ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: ADMIN_ID,
        item_id,
        bid_amount,
      }),
    });

    if (res.ok) {
      console.log("Bid", item_id, bid_amount);
    }
  }
</script>

{#if $ready}
  {@const info = $item_info[item_id]}
  {@const image = $images[info.image_id]}
  {@const auction = $auctions[item_id]}
  {@const seller = $users[auction.seller_id]}

  <h1 class="text-2xl font-bold mb-4 flex items-center space-x-3">
    <i class="fa-solid fa-circle text-red-500 animate-pulse mr-1"></i>
    {info.name}

    <div
      class=" bg-red-500 text-white px-2 py-1 rounded-lg items-center flex space-x-3"
    >
      <span class="text-sm">
        <i class="fa-regular fa-clock opacity-60 mr-0.5"></i>
        {new Date(auction.expiry).toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        })}
      </span>

      <span class="text-sm">
        <span class="opacity-60"> Bid </span>
        <span class="font-bold">
          ${auction.current_bid.toLocaleString()}
        </span>
      </span>
    </div>
  </h1>

  <div class="flex flex-row space-x-8">
    <!-- <img class="rounded-lg w-96" src={image.url} alt={image.alt} /> -->
    <img
      class="h-[20rem] w-[30rem] object-cover rounded-lg"
      src={image.url}
      alt={image.alt}
    />

    <div class="flex flex-col">
      <div class=" flex items-center">
        <img
          src={seller.avatar.url}
          alt={seller.avatar.alt}
          class="w-10 h-10 rounded-full inline-block mr-2 border-white border-4"
        />
        <span class="text-gray-400 text-xl">
          {seller.name}
        </span>
      </div>

      <div class="mt-2">
        <span class="font-bold">Email:</span>
        <span class="text-gray-400">
          {seller.email}
        </span>
      </div>

      <div class="mt-4">
        <span class="font-bold">Name:</span>
        <span class="text-gray-400">
          {info.name}
        </span>
      </div>

      <div>
        <span class="font-bold">Description:</span>
        <span class="text-gray-400">
          {info.description}
        </span>
      </div>

      <div class="mt-2 text-xl">
        <span class="font-bold">Buyout Price:</span>
        <span class="text-gray-400">
          {#if auction.buyout_price > 0}
            ${auction.buyout_price.toLocaleString()}
          {:else}
            <span class="text-red-500">Not Available</span>
          {/if}
        </span>
      </div>

      <div class="text-xl">
        <span class="font-bold">Current Bid:</span>
        <span class="text-green-400 font-bold">
          ${auction.current_bid.toLocaleString()}
        </span>
      </div>

      <div class="mt-2">
        <span class="font-bold">Bid State:</span>

        {#if auction.bid_state === "expired"}
          <span class="text-red-500">Expired</span>
        {:else if auction.bid_state === "listed"}
          <span class="text-green-500">Listed</span>
        {:else if auction.bid_state === "sold"}
          <span class="text-amber-500">Sold</span>
        {:else if auction.bid_state === "delisted"}
          <span class="text-gray-400">Delisted</span>
        {:else}
          <span class="text-red-500">Unknown</span>
        {/if}
      </div>

      <div class="mt-2">
        <span class="font-bold">Expires:</span>
        <span class="text-gray-400">
          {new Date(auction.expiry).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </span>
      </div>
    </div>
  </div>

  <div class="mt-8">
    <h2 class="text-xl font-bold mb-2">Submit Bid</h2>

    <div class="flex flex-row space-x-4 text-xl w-[20rem]">
      <input
        class="bg-gray-700 text-gray-400 w-full p-1 rounded-md"
        type="number"
        min={auction.current_bid + 1}
        bind:value={bid_amount}
      />

      <button
        class="bg-green-600 text-white font-bold px-2 py-1 rounded-md w-24 hover:bg-green-700 active:bg-green-800 transition-colors duration-100"
        on:click={makeBid}
      >
        <i class="fa-solid fa-plus"></i>
        Bid
      </button>
    </div>
  </div>

  <div class="mt-8">
    <h2 class="text-xl font-bold mb-2">Bids</h2>

    <ul class="flex flex-col space-y-2 w-[40rem]">
      {#each $bids
        .filter((bid) => bid.item_id === item_id)
        .sort((a, b) => b.bid_amount - a.bid_amount) as bid}
        {@const bidder = $users[bid.user_id]}
        <li
          class="flex flex-row space-x-4 p-2 rounded-lg bg-gray-700 {bid.bid_amount >=
          auction.current_bid
            ? 'text-green-500'
            : 'opacity-50 line-through'}"
        >
          <img
            src={bidder.avatar.url}
            alt={bidder.avatar.alt}
            class="w-10 h-10 rounded-full inline-block border-white border-4"
          />

          <div
            class="flex space-x-3 text-xl items-center justify-between w-full pr-3"
          >
            <div class="text-gray-400">
              {bidder.name}
            </div>

            <div>
              ${bid.bid_amount.toLocaleString()}
            </div>
          </div>
        </li>
      {/each}
    </ul>
  </div>
{:else}
  <p class="font-bold text-xl animate-pulse my-2">Fetching Data...</p>
{/if}
