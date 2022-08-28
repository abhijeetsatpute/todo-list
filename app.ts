import { Application } from "https://deno.land/x/oak/mod.ts";
import * as flags from "https://deno.land/std@0.153.0/flags/mod.ts";

import todoRoutes from './routes/todo.ts';
import { connect } from './helpers/db_client.ts';
const { args, exit } = Deno;
const DEFAULT_PORT = 8080;
const argPort = flags.parse(args).port;
const port = argPort ? Number(argPort) : DEFAULT_PORT;

connect();

const app = new Application();

// For other async middlewares to finish use async await 
app.use( async (ctx, next) => {
  console.log('just another middleware');
  await next();
});

app.use(async (ctx, next) => {
  ctx.response.headers.set('Access-Control-Allow-Origin', '*');
  ctx.response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  ctx.response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  await next();
})

app.use(todoRoutes.routes());
app.use(todoRoutes.allowedMethods());

await app.listen({ port });