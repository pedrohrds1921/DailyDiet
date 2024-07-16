import { FastifyInstance} from "fastify";
import { UserControler } from "../controller/userController";
const userControler=new UserControler
export async function userRoutes(app:FastifyInstance) {
    app.post('/',userControler.create)
    app.post('/session',userControler.session)
}