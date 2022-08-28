import { Router } from "https://deno.land/x/oak/mod.ts";

import { getDb } from '../helpers/db_client.ts';

const router = new Router();

interface Todo {
    id: string;
    text: string;
}

let todos: Todo[] = [];

router.get('/todos', (ctx) => {
    ctx.response.body = { todos: todos };
})

router.post('/todos', async(ctx) => {
    const data = await ctx.request.body().value;
    const newTodo: Todo = {
        id: new Date().toISOString(),
        text: data.text
    }
    
    todos.push(newTodo);

    ctx.response.body = {message: 'Created New Todo', todos: todos};
})

router.put('/todos/:todoId', async (ctx) => {
    const data = await ctx.request.body().value;
    const tId = ctx.params.todoId;
    const todoIndex = todos.findIndex(todo => todo.id === tId);
    if(todoIndex >= 0) {
        todos[todoIndex].text = data.text;
        return ctx.response.body = { message: "Updated", todos: todos };
    }
    
    ctx.response.body = {message: 'Updated Todo', todos: todos};
})

router.delete('/todos/:todoId', (ctx) => {
    const tId = ctx.params.todoId;
    todos = todos.filter(ele => ele.id !== tId)

    ctx.response.body = {message: 'Deleted Todo', todos: todos};
})

export default router;