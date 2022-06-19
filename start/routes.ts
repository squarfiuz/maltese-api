/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.post('/create_post', 'PostsController.create_post');
    Route.post('/delete_post', 'PostsController.delete_post');
    Route.get('/get_posts/:category', 'PostsController.get_posts');
    Route.get('/get_all_posts', 'PostsController.get_all_posts');
  }).prefix('/post');

  Route.group(() => {
    Route.post('/create_thread', 'ThreadsController.create_thread');
    Route.post('/delete_thread', 'ThreadsController.delete_thread');
    Route.get('/get_thread_posts/:thread_id', 'ThreadsController.get_thread_posts');
  }).prefix('/thread');

  Route.group(() => {
    Route.get('get_file/:file_id', 'CdnController.get_file');
    Route.post('create_file', 'CdnController.create_file');
    Route.post('delete_file', 'CdnController.delete_file');
  }).prefix('/cdn');
});