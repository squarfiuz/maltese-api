import { schema, CustomMessages } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class DeletePostValidator {
  constructor (protected ctx: HttpContextContract) {
  };
  public schema = schema.create({
    id: schema.string()
  });

  public messages: CustomMessages = {
	  "required": "The {{ field }} field is required"
  };
};