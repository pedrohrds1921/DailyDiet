import request from 'supertest'
import {test,beforeAll, afterAll,describe} from 'vitest'
import { app } from '../app'
import { execSync } from 'child_process'

describe('Users routes',()=>{
    beforeAll(async()=>{
        await app.ready()
        execSync('npm run knex migrate:latest')
       })
       afterAll(async()=>{
           await app.close()
       })
       test('It should be possible to create a new user',async()=>{
        execSync('npm run knex migrate:rollback --all')
        execSync('npm run knex migrate:latest')
          await request(app.server)
           .post('/user')
           .send({
               name:'Pedro Rodrigues',
               email:'pedro.contate@gmail.com',
               password:'Ordep@1921'
           }).expect(201)
       })
       
       test('should not create a new user with duplicated email',async()=>{
           await request(app.server)
            .post('/user')
            .send({
                name:'Pedro Rodrigues',
                email:'pedro.contate@gmail.com',
                password:'Ordep@1921'
            })

            await request(app.server)
            .post('/user')
            .send({
                name:'Pedro Rodrigues',
                email:'pedro.contate@gmail.com',
                password:'Ordep@1921'
            }).expect(422)
        })

})

