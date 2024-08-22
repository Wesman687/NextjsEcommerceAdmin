import { Category } from '../model/category'


export async function createCategory(properties) {
    console.log(properties)
    
        return await Category.create(properties)
    
}