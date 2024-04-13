<template>
  <v-app>
    <v-app-bar class="bg-blue-darken-4">
      <v-toolbar-title>My Online Store</v-toolbar-title>
      <v-btn class="mx-5" v-for="link in links" :key="link.text" :to="link.to">
        <v-icon>{{ link.icon }}</v-icon>
        {{ link.text }}
      </v-btn>
    </v-app-bar>
    <v-main class="bg-blue-lighten-5">

      <!-- TODO: Implement Create Item button for firestore 
            and a new dialogue for entering the item info -->

      <router-view v-slot="{ Component }">
        <transition name="shrink-explode">
          <v-container>
            <template v-if="products && products.length">
            <v-row>
              <v-col
                v-for="product in products"
                :key="product.id"
                cols="12"  
                sm="6"    
                md="4"    
                lg="3"    
              >
                <Component :is="Component"></Component>
                <StoreItem :product="product" />
              </v-col>
            </v-row>
            </template>
          </v-container>
        </transition>
      </router-view>
    </v-main>

    <v-footer color="primary" app>
      © 2023 My Online Store. All rights reserved.
    </v-footer>
  </v-app>
</template>

<script lang="ts" setup>
  import { computed,ref } from "vue";
  import { useItemStore } from "./stores/ProductStore";
  import { onBeforeMount } from "vue";
  import StoreItem from "./components/StoreItem.vue";

  const myStore = useItemStore();
  onBeforeMount(() => {
    myStore.init();
  });

  const links = ref([
    { text: "Home", to: "/", icon: "mdi-home" },
    { text: "Electronics", to: "/electronics", icon: "mdi-laptop" },
    { text: "Clothing", to: "/clothing", icon: "mdi-tshirt-crew" },
    { text: "Groceries", to: "/groceries", icon: "mdi-cart" },
    { text: "Best Seller", to: "/bestseller", icon: "mdi-cash-register" },
  ]);

  const products = computed(() => myStore.products || []);

  function createItem(){
    // TODO: implement onClick function for creating an item in
    //  firestore
  } 

</script>
./productStore