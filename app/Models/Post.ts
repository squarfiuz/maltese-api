import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public category: string;

  @column()
  public username: string;

  @column()
  public message: string;

  @column()
  public file_id: string;

  @column()
  public file_ext: string;

  @column()
  public reply_id: string;

  @column()
  public thread_id: string;

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime;
};