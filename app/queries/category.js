import { Category } from '../model/category'


export async function createCategory(name, parentCategory) {
    console.log(name, parentCategory)
    try {
        return await Category.create({
            name, 
            parent: parentCategory
        })
    } catch (error) {
        return error
    }
}