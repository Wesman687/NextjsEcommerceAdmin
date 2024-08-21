import { Category } from '../model/category'


export async function createCategory(name, parentCategory) {
    console.log(name, parentCategory)
    
        return await Category.create({
            name, 
            parent: parentCategory || undefined
        })
    
}