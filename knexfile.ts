import { config } from "./src/database";
import { env } from "./src/env";
const environment= env.NODE_ENV==='test'|| 'development'?config.test:config.prod
export default environment