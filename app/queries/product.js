import { Product } from '../model/products'


export async function createProduct(products) {
    console.log(products)
    try {
        return await Product.create(products)
    } catch (error) {
        return error
    }
}
export async function updateProduct({id, product,desc, price, images, category}) {
    console.log(id, product, desc, price, images, category)
    try {
        return await Product.findByIdAndUpdate(id, { product: product, desc: desc, price: price, images: images, category: category })
    } catch (error) {
        return error
    }
}