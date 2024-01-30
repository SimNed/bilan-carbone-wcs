import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ObjectType, Field, ID, Float } from "type-graphql";

import Category from "./category";
import Tag from "./tag";
import { CreateOrUpdateAd } from "./ad.args";

@Entity()
@ObjectType()
class Ad extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id!: string;

  @Column()
  @Field()
  title!: string;

  @Column({ default: "" })
  @Field()
  description!: string;

  @Column()
  @Field()
  owner!: string;

  @Column()
  @Field(() => Float)
  price!: number;

  @Column({ default: "" })
  @Field()
  picture!: string;

  @Column({ default: "" })
  @Field()
  location!: string;

  @CreateDateColumn()
  @Field()
  createdAt!: Date;

  @ManyToOne(() => Category, (category) => category.ads, { eager: true })
  @Field(() => Category)
  category!: Category;

  @JoinTable({ name: "TagsForAds" })
  @ManyToMany(() => Tag, (tag) => tag.ads, { eager: true })
  @Field(() => [Tag])
  tags!: Tag[];

  constructor(ad?: Partial<Ad>) {
    super();

    if (ad) {
      if (!ad.title) {
        throw new Error("Ad title cannot be empty.");
      }
      this.title = ad.title;

      if (!ad.owner) {
        throw new Error("Ad owner cannot be empty.");
      }
      this.owner = ad.owner;
      if (ad.description) {
        this.description = ad.description;
      }
      if (ad.price) {
        this.price = ad.price;
      }
      if (ad.picture) {
        this.picture = ad.picture;
      }
      if (ad.location) {
        this.location = ad.location;
      }
    }
  }

  static async saveNewAd(adData: CreateOrUpdateAd): Promise<Ad> {
    const newAd = new Ad(adData);
    if (adData.categoryId) {
      const category = await Category.getCategoryById(adData.categoryId);
      newAd.category = category;
    }
    // const associatedTags = [];
    if (adData.tagIds) {
      // for (const tagId of adData.tags) {
      //   const tag = await Tag.getTagById(tagId);
      //   associatedTags.push(tag);
      // }

      // Promise.all will call each function in array passed as argument and resolve when all are resolved
      newAd.tags = await Promise.all(adData.tagIds.map(Tag.getTagById));
    }
    const savedAd = await newAd.save();
    console.log(`New ad saved: ${savedAd.getStringRepresentation()}.`);
    return savedAd;
  }

  static async getAds(categoryId?: number): Promise<Ad[]> {
    const ads = await Ad.find({
      where: { category: { id: categoryId } },
      order: { createdAt: "DESC" },
    });
    return ads;
  }

  static async getAdById(id: string): Promise<Ad> {
    const ad = await Ad.findOne({
      where: { id },
    });
    if (!ad) {
      throw new Error(`Ad with ID ${id} does not exist.`);
    }
    return ad;
  }

  static async deleteAd(id: string): Promise<Ad> {
    const ad = await Ad.getAdById(id);
    await Ad.delete(id);
    return ad;
  }

  static async updateAd(id: string, partialAd: CreateOrUpdateAd): Promise<Ad> {
    const ad = await Ad.getAdById(id);
    Object.assign(ad, partialAd);

    if (partialAd.categoryId) {
      ad.category = await Category.getCategoryById(partialAd.categoryId);
    }
    if (partialAd.tagIds) {
      ad.tags = await Promise.all(partialAd.tagIds.map(Tag.getTagById));
    }

    await ad.save();
    ad.reload();
    return ad;
  }

  getStringRepresentation(): string {
    return `${this.id} | ${this.title} | ${this.owner} | ${this.price} €`;
  }
}

export default Ad;
