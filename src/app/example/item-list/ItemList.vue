<template>
  <div class="item-list">
    <item-detail />
  </div>
</template>
<script lang="ts">
import { useStore } from '@/app/app-state';
import { defineComponent } from 'vue';
import ItemDetail from '../item-detail/ItemDetail.vue';
import { ItemsActionTypes } from '../shared/state';
export default defineComponent({
  components: { ItemDetail },
  setup() {
    const store = useStore();
    store.dispatch(ItemsActionTypes.GET_DATA);
  },
});
</script>

<style lang="scss" scoped></style>
