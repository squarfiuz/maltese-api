import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Application from "@ioc:Adonis/Core/Application";
import { cuid } from "@ioc:Adonis/Core/Helpers";
import fs from "fs";

import CreateCdnValidator from "App/Validators/CreateCdnValidator";
import DeleteCdnValidator from "App/Validators/DeleteCdnValidator";

export default class CdnController {
  public async get_file ({ request, response }: HttpContextContract) {
    let id = request.param("file_id");
    let file_id: any;

    file_id = id.split(".")[0];

    return response.attachment(Application.tmpPath("uploads", file_id), id, "inline");
  };

  public async create_file ({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(CreateCdnValidator);

      if (payload.file.hasErrors) return response.badRequest(payload.file.errors);

      const file_id = payload.id || cuid();
      const file_ext = payload.file.extname;

      await payload.file.move(Application.tmpPath("uploads"), {
        name: file_id,
        overwrite: true,
      });

      return response.ok({
        file_id,
        file_ext
      });
    } catch (error) {
      response.badRequest(error);
    }
  };

  public async delete_file ({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(DeleteCdnValidator);

      const file = Application.tmpPath("uploads", payload.id);

      if (!fs.existsSync(file)) return response.badRequest("File not found");

      fs.unlinkSync(file);

      return response.ok(true);
    } catch (error) {
      response.badRequest(error);
    }
  };
};