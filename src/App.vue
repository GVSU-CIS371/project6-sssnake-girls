<template>
  <v-app>
    <v-app-bar class="bg-purple-darken-4">
      <v-toolbar-title>
        <img src="https://i.ibb.co/3SSgm7w/logo.gif" alt="Sssnake Girls Superstore" class="logo-image" />
     </v-toolbar-title>
      <v-btn class="mx-5" v-for="link in links" :key="link.text" :to="link.to">
        <v-icon>{{ link.icon }}</v-icon>
        {{ link.text }}
      </v-btn>
    </v-app-bar>
    <v-main class="bg-purple-lighten-5">

      <!-- Create New Item Dialog -->

        <v-dialog v-model="createDialog" max-width="500px" max-height="500px">
          <v-card>
            <v-card-title class="d-flex justify-space-between">
              Creating New Item {{ products.length+1 }}
              <v-icon
                icon="mdi-close-circle"
                class="me-2"
                size="small"
                @click="closeCreateMenu"
              >
              </v-icon>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="6">
                  <v-text-field v-model="name" label="Name"></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field v-model="rating" label="Rating"></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field v-model="price" label="Price"></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field v-model="stock" label="Stock"></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field v-model="category" label="Category"></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field v-model="image" label="Link to Image"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-text-field v-model="description" label="Description"></v-text-field>
              </v-row>
              <span class="align-center">
                <button class="mdi mdi-check" @click="createItemBtn">
                  Done
                </button>
              </span>
            </v-card-text>
          </v-card>
        </v-dialog>
            
      <router-view v-slot="{ Component }">
        <transition name="shrink-explode">
          <v-container>
            <template v-if="products && products.length">
            <v-row class="product-row">
              <v-col
                v-for="product in products"
                :key="product.id"
                cols="12"  
                sm="6"    
                md="4"    
                lg="3"    
              >
                <Component :is="Component"></Component>
                <v-card class="product-card">
                  <StoreItem :product="product" />
                </v-card>
                </v-col>

              <v-col
                cols="12"  
                sm="6"    
                md="4"    
                lg="3"    
              >
                <v-card class="product-card" @click="showCreateMenu()">
                  <v-card-text class="text-center align-center">
                    <v-icon icon="mdi-plus" class="me-2" size="128"> </v-icon>
                    <h1>Add New Item</h1>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            </template>
          </v-container>
        </transition>
      </router-view>
    </v-main>

    <v-footer class="bg-purple-darken-4" app>
      © 2024 Sssnake Girls SuperStore. All rights reserved.
    </v-footer>
  </v-app>
</template>

<script lang="ts" setup>
  import { computed,ref } from "vue";
  import { useItemStore } from "./stores/ProductStore";
  import { onBeforeMount } from "vue";
  import StoreItem from "./components/StoreItem.vue";
  import { ProductDoc } from "./types/product";

  const myStore = useItemStore();
  onBeforeMount(() => {
    myStore.init();
  });
  
  const createDialog = ref(false);
  const name = ref('');
  const rating = ref('');
  const price = ref('');
  const stock = ref('');
  const category = ref('');
  const image = ref('');
  const description = ref('');

  const links = ref([
    { text: "Home", to: "/", icon: "mdi-home" },
    { text: "Electronics", to: "/electronics", icon: "mdi-laptop" },
    { text: "Clothing", to: "/clothing", icon: "mdi-tshirt-crew" },
    { text: "Groceries", to: "/groceries", icon: "mdi-cart" },
    { text: "Best Seller", to: "/bestseller", icon: "mdi-cash-register" },
  ]);

  const products = computed(() => myStore.products || []);

  function createItemBtn(){
    const prod: ProductDoc = {
            id: `${products.value.length+1}`,
            data: {
                name: name.value,
                rating: Number(rating.value),
                price: Number(price.value),
                stock: Number(stock.value),
                category: category.value,
                image: image.value,
                description: description.value,
            }
        }

    myStore.createItem(prod);
    myStore.init();
    createDialog.value = false;
  } 

  function showCreateMenu(){
    createDialog.value = true;
  }

  function closeCreateMenu() {
    createDialog.value = false;
  }

</script>
./productStore

<style scoped>
  .logo-image {
    max-height: 200px;
    width: auto;
  }

  .product-row {
    display: flex;
    flex-wrap: wrap;
  }

  .product-row .v-col {
    display: flex;
  }

  .product-row .v-card {
    flex-grow: 1;
  }

  .product-card {
    width: 100%;
    height: 550px;
    margin-bottom: 10px;
  }
  
  .align-center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
</style>