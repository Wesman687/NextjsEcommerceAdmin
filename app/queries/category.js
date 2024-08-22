import { Category } from '../model/category'


export async function createCategory(name, parentCategory, properties) {
    console.log(name, parentCategory, properties)
    
        return await Category.create({
            name, 
            parent: parentCategory || undefined,
            properties
        })
    
}