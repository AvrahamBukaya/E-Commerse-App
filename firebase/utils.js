import { db } from './config'
import { collection, getDocs, getDoc, doc, addDoc, updateDoc, query, where } from 'firebase/firestore';
import Product from './../components/Product';


const getById = async (collName, id) => {

    const docRef = doc(db, collName, id);
    const docObj = await getDoc(docRef);
    const singleDoc = docObj.data();
    return singleDoc;

}

const getAll = async (collName) => {

    const colRef = collection(db, collName);
    const docsSnap = await getDocs(colRef);

    const products = docsSnap.docs.map(doc => doc.data());
    // console.log(products);


    return products;

}
const documentIsExist = async (collName, id) => {

    const cartsRef = collection(db, collName);

    const queryShot = query(cartsRef, where("product_id", "==", id));
    const docs = await getDocs(queryShot);
    return docs.empty

    // const res = await getDocs(q);
    // console.log(res);
    // return res.empty;
    // return res;


    // const docRef = doc(db, collName, id);

    // const docObj = await getDoc(docRef);
    // console.log(docObj);
    // console.log(docObj.exists());

    // return docObj.exists();
}

const updateProductInCard = async (product, collName) => {
    const cartsRef = collection(db, collName);
    const q = query(cartsRef, where("product_id", "==", product?.id));
    const docs = await getDocs(q);
    const prdt = docs.docs[0];
    const docRef = doc(db, collName, prdt.id);

    await updateDoc(docRef, {
        quantity: product.qnt
    });

    console.log(`${docRef} updated successfully!`);

}


const addToCart = async (doc, collName) => {
    const isEmpty = await documentIsExist(collName, doc.id);


    if (isEmpty) {
        await addDoc(collection(db, collName), {
            product_id: doc.id,
            quantity: doc.qnt
        });
        return;
    }

    updateProductInCard(doc, collName);


}





export { getAll, getById, addToCart }