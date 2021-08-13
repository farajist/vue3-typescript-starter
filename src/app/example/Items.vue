<template>
  <div>
    <app-header />
    <router-view />
  </div>
</template>

<script>
import { AppHeader } from '@/app/shared/components';
export default {
  name: 'items',
  components: {
    AppHeader,
  },
};
</script>

<style></style>
