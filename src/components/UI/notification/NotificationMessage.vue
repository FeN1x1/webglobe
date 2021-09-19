<template>
  <div class="flex items-center p-6 space-x-4 rounded-md bg-coolGray-50 text-coolGray-800">
    <div class="flex items-center self-stretch justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-10 h-10">
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </div>
    <span>{{ notification.message }}</span>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    setTimeout(() => this.remove(this.notification), 3000);
  },
  methods: {
    ...mapActions("notification", ["remove"]),
  },
};
</script>
