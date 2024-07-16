import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { knex } from "../database";
import { userRoutes } from "./user.route";
import { dishesRoutes } from "./dishes.route";
export async function Routes(app:FastifyInstance){
   app.register(userRoutes,{prefix:'/user'})
   app.register(dishesRoutes,{prefix:'/dishes'})
   
}
