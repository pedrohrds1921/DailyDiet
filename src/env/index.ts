import { config } from 'dotenv'
import { z } from 'zod'
config()
if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV==="development") {
  config({ path: '.env.test',override: true })
} else {
  config()
}
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  PORT: z.coerce.number(),
  DB_HOST:z.string(),
  DB_NAME:z.string(),
  DB_PASSWORD:z.string(),
  DB_TABLENAME:z.string(),


})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('⚠️ Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables.')
}

export const env = _env.data