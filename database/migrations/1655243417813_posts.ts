import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "posts";

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string("id").primary().unique();
      table.string("category").notNullable();
      table.string("username").notNullable();
      table.text("message").notNullable();
      table.string("file_id");
      table.string("file_ext");
      table.string("reply_id");
      table.string("thread_id");

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  };

  public async down () {
    this.schema.dropTable(this.tableName);
  };
}
