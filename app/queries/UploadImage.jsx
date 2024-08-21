'use server'
import { UploadApiResponse, v2 as cloudinary} from 'cloudinary'
import z from 'zod'

const formData = z.object({
    image: z.instanceof(FormData)
})

export const uploadImage = actionClient.schema(formData).action(async ({ parsedInput: {image}})=>{
    const formImage = image.get('image')

    if (!formImage) return {error: 'no image provided'}
    if (!image) return {error: 'No image provided'}

    const file = formImage
    try {
        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        return new Promise<UploadApiResponse>((resolve, reject) => {
            
        })
    } catch (error) {
        return { error: error}
    }
})