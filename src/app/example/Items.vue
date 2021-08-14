<template>
  <div>
    <app-header />
    <router-view />
  </div>
</template>

<script>
import { AppHeader } from '../shared/components';
export default {
  name: 'items',
  components: {
    AppHeader,
  },
};
</script>

<style></style>
