import { FastifyInstance} from "fastify";
import { DishesController } from "../controller/dishesController";
import { checkUserID } from "../middlewares/checkIDCookies";

const dishesController=new DishesController
export async function dishesRoutes(app:FastifyInstance) {
    app.addHook('preHandler',checkUserID)
    app.post('/',dishesController.create)
    app.get('/',dishesController.index)    
    app.get('/:disheId',dishesController.findByID)
    app.delete('/:disheId',dishesController.delete)
    app.put('/:disheId',dishesController.update)
    app.get('/metrics',dishesController.metrics)
}