# todo-list
Created a simple CRUD TODO list React app with GET POST PUT DELETE routes using Oak -Deno Framework and Mongo DB.


API example with Deno, Oak and mongodb

## Getting Started

```
deno run --allow-net app.ts
```

## Methods

### Get Todos
```
GET http://localhost:8000/todos
```

### Get Todo
```
GET http://localhost:8000/todos/:todoId
```

### Create Todo
```
POST http://localhost:8000/todos
Content-Type: application/json

{
  "name": "Task # 1"
}
```

### Update Todo
```
PUT http://localhost:8000/todos/:todoId
Content-Type: application/json

{
  "completed": true
}
```

### Delete Todo
```
DELETE http://localhost:8000/todos/:todoId
Content-Type: application/json
```

## Authors
* **Abhijeet Satpute** - *Developer* - [Abhijeet](https://github.com/abhijeetsatpute)
