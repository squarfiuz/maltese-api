import { schema, CustomMessages } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CreateCdnValidator {
  constructor (protected ctx: HttpContextContract) {
  };
  public schema = schema.create({
    file: schema.file({
      extnames: ["png", "jpg", "jpeg", "webm", "ico", "gif", "mp3", "mp4"],
      size: "4mb"
    }),
    id: schema.string.optional()
  });

  public messages: CustomMessages = {
	  "required": "The {{ field }} field is required",
    "extname": "Only the formats {{ values }} are allowed",
    "size": "The file size must be less than {{ limit }}"
  };
};