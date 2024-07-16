import {knex as setupknex,Knex} from 'knex'
import { env } from './env'
export const config:{[key:string]:Knex.Config}={
        test:{
            client:'pg',
            connection:{
                host:env.DB_HOST,
                port:5432,
                database:env.DB_TABLENAME,
                user:env.DB_NAME,
                password:env.DB_PASSWORD
            },
            useNullAsDefault:true,
            migrations:{
                extension:'ts',
                directory:'./db/migrations',  
            }
        },
        prod:{
            client:'pg',
            connection:{
                host:env.DB_HOST,
                port:5432,
                database:env.DB_TABLENAME,
                user:env.DB_NAME,
                password:env.DB_PASSWORD
            },
            useNullAsDefault:true,
            migrations:{
                extension:'ts',
                directory:'./db/migrations',  
            }
        },
}
const environment= env.NODE_ENV==='test'|| 'development'?config.test:config.prod

export const knex=setupknex(environment)