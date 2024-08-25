import { dbConnect } from "../../lib/mongo"
import { Order } from "../../model/Order"


export const GET = async (req, res) => {
    await dbConnect()
    const orders = await Order.find().sort({createdAt:-1})
    console.log(orders, 'orders')
    return Response.json(orders)

}