import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { cuid } from "@ioc:Adonis/Core/Helpers";

import Post from "App/Models/Post";
import Thread from "App/Models/Thread";

import CreateThreadValidator from "App/Validators/CreateThreadValidator";
import DeleteThreadValidator from "App/Validators/DeleteThreadValidator";

export default class ThreadsController {
  public async create_thread ({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(CreateThreadValidator);
      const thread_id = cuid();

      const thread = await Thread.create({
        id: thread_id,
        post_id: payload.post_id
      });

      return response.ok(thread);
    } catch (error) {
      response.badRequest(error);
    }
  };

  public async delete_thread ({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(DeleteThreadValidator);

      const thread = await Thread.find(payload.id);

      if (!thread) return response.badRequest("Thread not found");

      await thread.delete();

      return response.ok(thread.$isDeleted);
    } catch (error) {
      response.badRequest(error);
    }
  };

  public async get_thread_posts ({ request, response }: HttpContextContract) {
    const thread_id = request.param("thread_id");

    const posts = await Post.query().where("thread_id", thread_id);

    return response.ok(posts);
  };
};
