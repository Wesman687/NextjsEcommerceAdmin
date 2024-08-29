import { NextResponse } from "next/server"
import { dbConnect } from "../../lib/mongo"
import { Pid } from "../../model/pid"


export const POST = async (req, res) =>{
    await dbConnect()
    const result = await Pid.findById('66cfd32bdc0b57274f54c4ce')
    const newPid = result.currentPid + 1
    await Pid.findByIdAndUpdate('66cfd32bdc0b57274f54c4ce',{
        currentPid: newPid
    })

    return Response.json(newPid)
}

