import { Product } from '../model/products'


export async function createProduct(products) {
    try {
        return await Product.create(products)
    } catch (error) {
        console.log(error)
    }
}