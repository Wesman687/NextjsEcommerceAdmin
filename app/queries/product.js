import { Product } from '../model/products'


export async function createProduct(products) {
    console.log(products)
    try {
        return await Product.create(products)
    } catch (error) {
        return error
    }
}
export async function updateProduct({id, product,desc, price, images}) {
    console.log(id, product, desc, price, images)
    try {
        return await Product.findByIdAndUpdate(id, { product: product, desc: desc, price: price, images: images })
    } catch (error) {
        return error
    }
}