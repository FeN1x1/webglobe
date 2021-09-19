<template>
  <!-- <div>
    <ul class="flex flex-auto justify-center p-6">
      <li class="px-4 text-xl font-semibold"><router-link to="/personsList">Persons</router-link></li>
      <li class="px-4 text-xl font-semibold"><router-link to="/jobsList">Jobs</router-link></li>
    </ul>
  </div> -->
  <header class="text-gray-600 body-font max-w-6xl mx-auto">
    <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
          viewBox="0 0 24 24"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
        <span class="ml-3 text-xl">Webglobe</span>
      </a>
      <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
        <router-link to="/jobsList" class="mr-5 hover:text-gray-900">Pracovné pozície</router-link>
        <router-link to="/personsList" class="mr-5 hover:text-gray-900">Osoby</router-link>
        <router-link to="/job" class="mr-5 hover:text-gray-900">Nová pracovná pozícia</router-link>
        <router-link to="/person" class="mr-5 hover:text-gray-900">Nová osoba</router-link>
      </nav>
    </div>
  </header>
</template>

<script>
export default {};
</script>

<style scoped></style>
