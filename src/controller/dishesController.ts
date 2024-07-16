import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { knex } from "../database"
export class DishesController{
    async create(req:FastifyRequest,replay:FastifyReply){
        const createUserShema=z.object({
            name:z.string(),
            description:z.string(),
            date:z.date().default(new Date()),
            in_diet:z.boolean()
        })
        const {name,description,in_diet}=createUserShema.parse(req.body)
        const {user_id}=req.cookies
        
        const [dishes]= await knex('dishes').insert({
            name,
            user_id,
            description,
            date:new Date(),
            in_diet
          
        },['*'])
       
        replay.status(200).send( {dishes})
    }
    async update(req:FastifyRequest,replay:FastifyReply){
        const createUserShema=z.object({
            name:z.string().optional(),
            description:z.string().optional(),
            date:z.date().default(new Date()),
            in_diet:z.boolean()
        })
        const paramsShema=z.object({disheId:z.string()})
        const {disheId}=paramsShema.parse(req.params)
        const {name,description,in_diet}=createUserShema.parse(req.body)
        const {user_id}=req.cookies
        const dishes= await knex('dishes')
        .where({
            id:disheId,
            user_id:user_id
        })
        .update({
            name,
            description,
            in_diet,
            updated_at:new Date
        })
        console.log(dishes)
        replay.status(200).send( {dishes})
    }
    async index(req:FastifyRequest,replay:FastifyReply){
    const {user_id}=req.cookies
    const dishes= await knex('dishes').where({user_id})
        replay.status(200).send( {dishes})
    }
    async findByID(req:FastifyRequest,replay:FastifyReply){
        const paramsShema=z.object({disheId:z.string()})
        const {disheId}=paramsShema.parse(req.params)

        const dishe= await knex('dishes').where({id:disheId})
        if(!dishe){
            return replay.status(403).send({mesage:"Dishe not found"})
        }
        return replay.status(200).send(dishe)
    }
    async delete(req:FastifyRequest,replay:FastifyReply){
        const paramsShema=z.object({disheId:z.string()})
        const {disheId}=paramsShema.parse(req.params)
        const dishe= await knex('dishes').where({id:disheId}).del()
        console.log(disheId)
        if(!dishe){
            return replay.status(403).send({mesage:"Dishe not found"})
        }
        return replay.status(200).send({message:"Dieshe deleted"})
    }
    async metrics( req:FastifyRequest,replay:FastifyReply){
        const {user_id}=req.cookies
        const dishes= await knex('dishes').where({user_id}).orderBy('created_at','asc')
        if(!dishes){
           return replay.send({message:'Not found data for analitcs!'})
        }
        const DietCount = dishes.reduce((acc,dish)=>{
            if(dish.in_diet){
                acc.inDietCount++
            }
            else{
                acc.outDietCount++
            }
            return acc
        },{inDietCount:0,outDietCount:0})
        const {bestStreak} = dishes.reduce((acc,dish) => {
              if (dish.in_diet) {
                acc.currentStreak++;
                acc.bestStreak = Math.max(acc.bestStreak, acc.currentStreak);
              } else {
                acc.currentStreak = 0;
              }
              return acc;
            },
            { bestStreak: 0, currentStreak: 0 } // Valor inicial do acumulador
          )
          return replay.status(200).send({
            totalDishes:dishes.length,
            inDietCount:DietCount.inDietCount,
            outDietCount:DietCount.outDietCount,
            bestStreak
          })
    }




}

