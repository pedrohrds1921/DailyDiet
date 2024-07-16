import { FastifyReply, FastifyRequest } from "fastify";

export async function checkUserID(
    req:FastifyRequest,
    replay:FastifyReply
) {
    const {user_id}= req.cookies
    if(!user_id){
        return replay.status(401).send({
            error:"Unauthorized",
        })
    }
}