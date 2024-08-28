import { dbConnect } from "../../lib/mongo"
import { Order } from "../../model/Order"


export const GET = async (req, res) => {
    await dbConnect()
    const orders = await Order.find().sort({createdAt:-1})
    return Response.json(orders)

}