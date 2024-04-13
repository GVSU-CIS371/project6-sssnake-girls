import { defineStore } from "pinia"
import { ProductDoc } from "../types/product";
import { initProducts } from "../data-init";
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyCxcvlDt-2NFeubTkbzHG1I8ppFkgN27jk",
  authDomain: "sssnake-girls-fs.firebaseapp.com",
  projectId: "sssnake-girls-fs",
  storageBucket: "sssnake-girls-fs.appspot.com",
  messagingSenderId: "875025297651",
  appId: "1:875025297651:web:311bf0a1272cc27097c786"
};

const app = initializeApp(firebaseConfig);

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
        deleteItem(prod: ProductDoc){
            //TODO: implement delete function
        },
        updateItem(prod: ProductDoc){
            //TODO: implement update function
        },
        async fetchData() {
            await new Promise(resolve => setTimeout(resolve, 1000));
        },
    }
})