import { schema, CustomMessages } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CreateThreadValidator {
  constructor (protected ctx: HttpContextContract) {
  };
  public schema = schema.create({
    post_id: schema.string()
  });

  public messages: CustomMessages = {
	  "required": "The {{ field }} field is required"
  };
};