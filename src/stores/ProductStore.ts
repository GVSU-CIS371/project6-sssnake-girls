import { defineStore } from "pinia"
import { ProductDoc } from "../types/product";
import { initProducts } from "../data-init";
import { initializeApp/*, FirebaseApp*/ } from "firebase/app";
import {    getFirestore,
            Firestore,
            getDocs,
            addDoc,
            collection,
            QuerySnapshot,
            QueryDocumentSnapshot,
            CollectionReference,
            setDoc,
            doc
        } from "firebase/firestore";

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
const db: Firestore = getFirestore(app);

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
            const collectionRef = collection(db, 'Products');
            getDocs(collectionRef).then((qs: QuerySnapshot) => {
                if (qs.size === 0) {
                    this.products = initProducts;
                } else {
                    const fetchedProducts: ProductDoc[] = [];
                    qs.forEach((qd: QueryDocumentSnapshot) => {
                        const productData = qd.data() as ProductDoc;
                        const docId = qd.id;
                        fetchedProducts.push({ ...productData, id: docId });
                    });
                    this.products = fetchedProducts;
                }
            }).catch((error) => {
                console.error("Error checking if collection is empty: ", error);
            });
        },
        filterByCategory(cat: string){
            this.products = initProducts.filter((prod) => prod.data.category == cat)
        },  
        filterByRating(minRating: number){
            this.products = initProducts.filter((prod) => prod.data.rating >= minRating)
        },
        createItem(prod: ProductDoc){
            const myColl: CollectionReference = collection(db, "Products");
            addDoc(myColl, {id: prod.id, data: prod.data})
                .then(() => {
                    console.log("New doc added");
                })
                .catch((err: any) => {
                    console.log("Error adding new doc",err)
                });
            this.products?.push(prod);
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