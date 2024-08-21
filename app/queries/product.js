import { Product } from '../model/products'


export async function createProduct(products) {
    try {
        return await Product.create(products)
    } catch (error) {
        return error
    }
}
export async function updateProduct({id, product,desc, price}) {
    try {
        return await Product.findByIdAndUpdate(id, { product: product, desc: desc, price: price })
    } catch (error) {
        return error
    }
}