<template>
  <div class="flex flex-col text-center w-full my-12">
    <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">{{titleName}}</h1>
  </div>
</template>

<script>
export default {
  props: {
    titleName: {
      type: String,
      default: "",
    },
  },
};
</script>
