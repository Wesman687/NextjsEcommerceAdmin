import { Product } from '../model/products'


export async function createProduct(products) {
    console.log(products)
    try {
        return await Product.create(products)
    } catch (error) {
        return error
    }
}
export async function updateProduct({id, products}) {
    console.log(id, products)
    try {
        return await Product.findByIdAndUpdate(id, { products })
    } catch (error) {
        return error
    }
}