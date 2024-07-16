import fastify from "fastify";
import 'dotenv/config'
import { Routes } from "./routes";
import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
export const app=fastify()
app.register(cors)
app.register(cookie)
app.register(Routes)

