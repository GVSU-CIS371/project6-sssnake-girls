import { defineStore } from "pinia"
import { ProductDoc } from "../types/product";
import { initProducts } from "../data-init";

export const useItemStore = defineStore("ItemStore", {
    state: () => ({
        count: 0,
        products: null as ProductDoc[] | null,
    }),
    actions: {
        increment(){
            this.count++
        },
        init(){
            
            //TODO: make initProducts run if firestore empty, otherwise load firebase
            
            this.products = initProducts;
        },
        filterByCategory(cat: string){
            this.products = initProducts.filter((prod) => prod.data.category == cat)
        },  
        filterByRating(minRating: number){
            this.products = initProducts.filter((prod) => prod.data.rating >= minRating)
        },
        async fetchData() {
            await new Promise(resolve => setTimeout(resolve, 1000));
        },
    }
})