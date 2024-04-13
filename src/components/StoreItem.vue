<template>
    <v-card>
        <v-card-title>
            {{ product.data.name }}
        </v-card-title>

    <!-- TODO: Implement Delete Button for firestore-->

        <v-card-subtitle>
            <span class="mdi mdi-star"></span>
            {{product.data.rating}} 
            <span>stars {{ message }}</span>
            <span class="mdi mdi-currency-usd"></span>
            {{product.data.price}} 
            <span class="mdi mdi-store-outline"></span>
            {{product.data.stock}}
        </v-card-subtitle>
        <div class="image-container">
            <v-img :src="product.data.image" alt="Product Image" class="image" />
        </div>
        <v-card-text>
        {{product.data.description}}
        </v-card-text>


    <!-- TODO: Implement Update Button for firestore-->

    </v-card>
</template>

<script lang="ts" setup>
    import { ProductDoc } from '../types/product';
    defineProps<{
        product: ProductDoc;
    }>();

    // TODO: implement onClick function for delete button that 
    // confirms user wants to delete, then deletes item from firestore

    // TODO: implement onClick function for update button that
    // creates a dialog for user to enter updated item info

</script>

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
</style>

