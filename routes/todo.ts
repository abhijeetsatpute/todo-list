import { Router } from "https://deno.land/x/oak/mod.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.31.0/mod.ts";

import { getDb } from '../helpers/db_client.ts';

const router = new Router();

interface Todo {
    id: string;
    text: string;
}

// let todos: Todo[] = [];

router.get('/todos', async (ctx) => {
    const todos = await getDb().collection('todos').find({ text: { $ne: null } }).toArray();; // { _id: ObjectId(), text: '...' }[]
    ctx.response.body = { todos: todos };
  });

router.post('/todos', async(ctx) => {
    const todos = await getDb().collection<Todo>('todos');
    const data = await ctx.request.body().value;
    const newTodo: Todo = {
        id: new Date().toISOString(),
        text: data.text
    }
    
    const id = await todos.insertOne(newTodo);
    ctx.response.body = {message: 'Created New Todo', todos: newTodo};
})

router.put('/todos/:todoId', async (ctx) => {
    const todos = await getDb().collection<Todo>('todos');
    const data = await ctx.request.body().value;
    const tId = ctx.params.todoId;
    const updatedTodo = {
        id: tId,
        text : data.text,
    }
    const { matchedCount, modifiedCount, upsertedId } = await todos.replaceOne(
        { id: tId },
        updatedTodo 
        ,// new document
    );
    
    ctx.response.body = {message: 'Updated Todo', todos: updatedTodo};
})

router.delete('/todos/:todoId', async (ctx) => {
    const todos = await getDb().collection<Todo>('todos');
    const tId = ctx.params.todoId;
    const deleteCount = todos.deleteOne({ id: tId });

    ctx.response.body = {message: `Deleted ${deleteCount} Todo`, todos: todos};
})

export default router;