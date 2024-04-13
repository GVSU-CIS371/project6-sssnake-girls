<script lang="ts" setup>
  import { useItemStore } from "../stores/ProductStore";
  import { onBeforeMount } from "vue";

  const myStore = useItemStore();
  onBeforeMount(() => {
    myStore.filterByCategory("Groceries");
  });
</script>
./productStore