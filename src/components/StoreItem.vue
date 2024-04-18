<template>
        <v-card-title>
            {{ product.data.name }}
        </v-card-title>

   
        <v-card-subtitle>
            <span class="mdi mdi-star"></span>
            {{product.data.rating}} 
            <span>stars <!--{{ message }}--></span>
            <span class="mdi mdi-currency-usd"></span>
            {{product.data.price}} 
            <span class="mdi mdi-store-outline"></span>
            {{product.data.stock}}
        </v-card-subtitle>
        <v-row class="button-row" align="center">
            <button class="mdi mdi-delete" @click="showDeleteMenu(product)">    Delete</button>
            <button class="mdi mdi-update" @click="showUpdateMenu(product)">    Update</button>
        </v-row>
        <div class="image-container">
            <v-img :src="product.data.image" alt="Product Image" class="image" />
        </div>
        <v-card-text>
        {{product.data.description}}
        </v-card-text>

        <v-dialog v-model="updateDialog" max-width="500px" max-height="500px">
          <v-card>
            <v-card-title class="d-flex justify-space-between">
              Updating Item {{ product.id }}
              <v-icon
                icon="mdi-close-circle"
                class="me-2"
                size="small"
                @click="closeUpdateMenu"
              >
              </v-icon>
            </v-card-title>
            <v-card-text>
              <v-row>

                <!-- TODO: 
                    Need to capture the data from these text fields to make
                    a new ProductDoc and pass that into updateItemSubmit()
                -->

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
              </v-row>
              <v-row>
                <v-text-field v-model="image" label="Link to Image"></v-text-field>
              </v-row>
            </v-card-text>
            <v-footer class="button-row">
                <span class="align-center">
                  <button class="mdi mdi-check" @click="updateItemSubmit()">
                    Done
                  </button>
                </span>
            </v-footer>
          </v-card>
        </v-dialog>

        <v-dialog v-model="deleteDialog" max-width="500px" max-height="500px">
          <v-card>
            <v-card-title class="d-flex justify-space-between">
              Are you sure you want to delete this item?
              <v-icon
                icon="mdi-close-circle"
                class="me-2"
                size="small"
                @click="closeDeleteMenu"
              >
              </v-icon>
            </v-card-title>
            <v-card-text>
              <v-row>
                ID: {{ product.id }}
              </v-row>
              <v-row>
                Name: {{ product.data.name }}
              </v-row>
            </v-card-text>
              <v-footer class="button-row">
                <span class="align-center button-row">
                  <button class="mdi mdi-delete" @click="deleteItemSubmit(product)">
                    Yes, Delete
                  </button>
                </span>
            </v-footer>
          </v-card>
        </v-dialog>

   
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    import { ProductDoc } from '../types/product';
    import { useItemStore } from '../stores/ProductStore';
    
    defineProps<{
        product: ProductDoc;
    }>();

    
    const updateDialog = ref(false);
    const deleteDialog = ref(false);
    const id = ref();
    const name = ref('');
    const rating = ref('');
    const price = ref('');
    const stock = ref('');
    const image = ref('');

    function showDeleteMenu(prod: ProductDoc){
        id.value = prod.id
        name.value = prod.data.name
        deleteDialog.value = true;
    }

    function deleteItemSubmit(prod: ProductDoc){
        const myStore = useItemStore();
        myStore.deleteItem(prod);
        myStore.init();
        deleteDialog.value = false;
    }

    function closeDeleteMenu() {
        deleteDialog.value = false;
    }

    function showUpdateMenu(prod: ProductDoc){
        id.value = prod.id
        name.value = prod.data.name
        rating.value = prod.data.rating.toString()
        price.value = prod.data.price.toString()
        stock.value = prod.data.stock.toString()
        image.value = prod.data.image
        updateDialog.value = true;
    }

    function updateItemSubmit(){
        const prod: ProductDoc = {
            id: id,
            data: {
                name: name,
                rating: rating,
                price: price,
                stock: stock,
                image: image
            }
        }

        const myStore = useItemStore();
        myStore.updateItem(prod);
        myStore.init();
    
        updateDialog.value = false;
    }

    function closeUpdateMenu() {
        updateDialog.value = false;
    }
</script>
./productStore

<style scoped>
    .image-container {
        min-height: 300px;
        max-height: 300px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .image {
        max-width: 200px;
        justify-content: center;
        align-items: center;
    }
    
    .button-row {
        margin-top: 20px;
        justify-content: center;
    }

    .button-row button {
        margin: 0 10px; /* Add some spacing between buttons */
    }
    
</style>

