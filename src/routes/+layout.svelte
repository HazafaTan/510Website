<script lang="ts">
  import "../app.css";
</script>

<header>
  <nav
    class="w-full bg-blue-700 p-5 text-white flex justify-between items-center"
  >
    <div class="flex items-center space-x-5 font-bold">
      <a href="/" class="flex items-center justify-between w-24"
        ><i class="fa-solid fa-car-tunnel text-3xl"></i>Home</a
      >
      <!-- <a href="/about">About</a> -->
      <a href="/admin">Admin</a>
    </div>
    <div class="font-bold">
      Logged in as <span class="text-blue-200">Admin</span>
    </div>
  </nav>
</header>

<main class="m-10">
  <slot />
</main>

<style>
  :global(::-webkit-scrollbar) {
    width: 10px;
  }

  /* Track */
  :global(::-webkit-scrollbar-track) {
    @apply bg-gray-900;
  }

  /* Handle */
  :global(::-webkit-scrollbar-thumb) {
    @apply bg-gray-700;
  }

  /* Handle on hover */
  :global(::-webkit-scrollbar-thumb:hover) {
    @apply bg-gray-700;
  }
</style>
