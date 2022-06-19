import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "foreign_keys";

  public async up () {
    this.schema.alterTable("posts", (table) => {
      table.foreign("thread_id").references("id").inTable("threads").onDelete("CASCADE");
    });

    this.schema.alterTable("threads", (table) => {
      table.foreign("post_id").references("id").inTable("posts").onDelete("CASCADE");
    });
  };
}
