<template>
  <div class="bg-gray-100 rounded-lg fixed bottom-0 pr-10">
    <NotificationMessage v-for="notification in notifications" :key="notification.id" :notification="notification" />
  </div>
</template>

<script>
import NotificationMessage from "@/components/UI/notification/NotificationMessage.vue";
import { mapState } from "vuex";

export default {
  components: {
    NotificationMessage,
  },
  computed: {
    ...mapState("notification", ["notifications"]),
  },
};
</script>
