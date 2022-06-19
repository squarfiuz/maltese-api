import { schema, CustomMessages } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CreatePostValidator {
  constructor (protected ctx: HttpContextContract) {
  };
  public schema = schema.create({
    category: schema.string(),
	  username: schema.string(),
    message: schema.string(),
    file: schema.file.optional({
      extnames: ["png", "jpg", "jpeg", "webm", "ico", "gif", "mp3", "mp4"],
      size: "4mb"
    }),
    reply_id: schema.string.optional(),
    thread_id: schema.string.optional()
  });

  public messages: CustomMessages = {
	  "required": "The {{ field }} field is required",
    "extname": "Only the formats {{ values }} are allowed",
    "size": "The file size must be less than {{ limit }}"
  };
};