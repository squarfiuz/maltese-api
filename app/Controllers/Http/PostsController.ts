import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Application from "@ioc:Adonis/Core/Application";
import { cuid } from "@ioc:Adonis/Core/Helpers";

import Post from "App/Models/Post";
import Thread from "App/Models/Thread";

import CreatePostValidator from "App/Validators/CreatePostValidator";
import DeletePostValidator from "App/Validators/DeletePostValidator";

export default class PostsController {
  public async create_post ({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(CreatePostValidator);
      const post_id = cuid();
      let file_id: any;
      let file_ext: any;
      let thread_id: any;

      if (payload.file) {
        if (payload.file.hasErrors) return response.badRequest(payload.file.errors);

        file_id = cuid();
        file_ext = payload.file.extname;

        await payload.file.move(Application.tmpPath("uploads"), {
          name: file_id,
          overwrite: true,
        });
      }

      if (payload.reply_id && !payload.thread_id) {
        thread_id = cuid();

        await Thread.create({
          id: thread_id,
          post_id
        });
      } else {
        thread_id = payload.thread_id;
      }

      const post = await Post.create({
        id: post_id,
        category: payload.category,
        username: payload.username,
        message: payload.message,
        file_id,
        file_ext,
        reply_id: payload.reply_id,
        thread_id
      });

      return response.ok(post);
    } catch (error) {
      response.badRequest(error);
    }
  };

  public async delete_post ({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(DeletePostValidator);

      const post = await Post.find(payload.id);

      if (!post) return response.badRequest("Post not found");

      await post.delete();

      return response.ok(post.$isDeleted);
    } catch (error) {
      response.badRequest(error);
    }
  };

  public async get_posts ({ request, response }: HttpContextContract) {
    const category = request.param("category");

    const posts = await Post.query().where("category", category).whereNull("reply_id");

    return response.ok(posts);
  };

  public async get_all_posts ({ response }: HttpContextContract) {
    const posts = await Post.query();

    return response.ok(posts);
  };
};
