import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Ad from "./ad";
import { Field, ID, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
class Tag extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id!: string;

  @Column({ unique: true })
  @Field()
  name!: string;

  @ManyToMany(() => Ad, (ad) => ad.tags)
  ads!: Ad[];

  constructor(tag?: Partial<Tag>) {
    super();

    if (tag) {
      if (!tag.name) {
        throw new Error("Tag name cannot be empty.");
      }
      this.name = tag.name;
    }
  }

  static async getTags(): Promise<Tag[]> {
    const tags = await Tag.find();
    return tags;
  }

  static async getTagById(id: string): Promise<Tag> {
    const tag = await Tag.findOneBy({ id });
    if (!tag) {
      throw new Error(`Tag with ID ${id} does not exist.`);
    }
    return tag;
  }

  private static async getTagByName(name: string): Promise<Tag | null> {
    const tag = await Tag.findOneBy({ name });
    return tag;
  }

  static async saveNewTag(tagData: Partial<Tag>): Promise<Tag> {
    if (!tagData.name) {
      throw new Error("Tag name cannot be empty.");
    }
    const existingTag = await Tag.getTagByName(tagData.name);
    if (existingTag) {
      throw Error(`Tag with name "${tagData.name}" already exists.`);
    }
    const newTag = new Tag(tagData);
    const savedTag = await newTag.save();
    console.log(`New tag saved: ${savedTag.getStringRepresentation()}.`);
    return savedTag;
  }

  getStringRepresentation(): string {
    return `${this.id} | ${this.name}`;
  }
}

export default Tag;
