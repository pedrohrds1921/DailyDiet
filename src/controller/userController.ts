import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { knex } from "../database"

export class UserControler{
    async create(req:FastifyRequest,replay:FastifyReply){
        const createUserShema=z.object({
            name:z.string(),
            email:z.string(),
            password:z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$*])[A-Za-z\d@#$*]{8,}$/)
        })
        const {name,email,password}=createUserShema.parse(req.body)
        const data = await knex('users').where('email',email).first()
        if(data){
            return replay.status(422).send('Email em uso!')
        }
        const user= await knex('users').insert({
            id:crypto.randomUUID(),
            name,
            email,
            password,
        })
        replay.status(201).send( {user})
    }
    async session(req:FastifyRequest,replay:FastifyReply){
    const createSessionShema=z.object({
        email:z.string(),
        password:z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$*])[A-Za-z\d@#$*]{8,}$/)
    })
    const {email,password}=createSessionShema.parse(req.body)

    const user= await knex('users').where('email',email).first()
    
    if(!user || user.password!=password){
        return replay.send('Email e/ousenha incorreta!')
    }
    
    const user_id= user.id

        replay.cookie('user_id',user_id,{
            path:'/',
            maxAge:1000*60
        })
    replay.send(user)
    }
}