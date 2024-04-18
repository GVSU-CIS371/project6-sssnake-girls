import { defineStore } from "pinia"
import { ProductDoc } from "../types/product";
import { initProducts } from "../data-init";
import { initializeApp/*, FirebaseApp*/ } from "firebase/app";
import {    getFirestore,
            Firestore,
            getDocs,
            collection,
            QuerySnapshot,
            QueryDocumentSnapshot,
            setDoc,
            doc,
            deleteDoc,
            updateDoc,
            DocumentReference
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
            
            /*
            // Bulk creates docs in firestore
            this.products = initProducts;
            this.products.forEach(async (pd: any) => {
                const prodDoc = doc(db, "Products", pd.id);
                await setDoc(prodDoc, {id: pd.id, data: pd.data});
            });
            */
            
            getDocs(collectionRef).then((qs: QuerySnapshot) => {
                if (qs.size === 0) {
                    this.products = initProducts;
                    console.log("Firestore empty, loading backup array")
                } else {
                    const fetchedProducts: ProductDoc[] = [];
                    qs.forEach((qd: QueryDocumentSnapshot) => {
                        const productData = qd.data() as ProductDoc;
                        const docId = qd.id;
                        fetchedProducts.push({ ...productData, id: docId });
                    });
                    this.products = fetchedProducts;
                    console.log("Firestore successfully loaded")
                }
            }).catch((error) => {
                console.error("Error checking if collection is empty: ", error);
            });
        },
        filterByCategory(cat: string){
            getDocs(collection(db, 'Products')).then((qs: QuerySnapshot) => {
                if (qs.size === 0) {
                    this.products = initProducts;
                    console.log("Firestore empty, loading backup array")
                } else {
                    const fetchedProducts: ProductDoc[] = [];
                    qs.forEach((qd: QueryDocumentSnapshot) => {
                        const productData = qd.data() as ProductDoc;
                        const docId = qd.id;
                        fetchedProducts.push({ ...productData, id: docId });
                    });
                    this.products = fetchedProducts;
                    console.log("Firestore successfully reloaded")
                }
            }).catch((error) => {
                console.error("Error checking if collection is empty: ", error);
            });
            var newProds = this.products
            this.products = newProds!.filter((prod) => prod.data.category == cat)
        },  
        filterByRating(minRating: number){
            var newProds = this.products
            this.products = newProds!.filter((prod) => prod.data.rating >= minRating)
        },
        createItem(prod: ProductDoc){
            const myDoc = doc(db, "Products", `${prod.id}`);
            setDoc(myDoc, {
                id: prod.id,
                data: prod.data,
            })
            this.products?.push(prod);
        },
        deleteItem(prod: ProductDoc){
            const toRemove = doc(db, `Products/${ prod.id }`);
            deleteDoc(toRemove).then(() => {
                console.log(`Product ${ prod.id } removed`);
            });
        },
        updateItem(prod: ProductDoc){
            const myDoc: DocumentReference = doc(db, `Products/${prod.id}`);
            updateDoc(myDoc, {
                id: prod.id,
                data: prod.data,
            }).then(() => {
                console.log(`Successfully updated item ${prod.id}`)
            })
            this.products?.push(prod);
        },  
        async fetchData() {
            await new Promise(resolve => setTimeout(resolve, 1000));
        },
    }
})