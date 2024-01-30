import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Ad from "./ad";
import { Field, ID, Int, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id!: number;

  @Column({ unique: true })
  @Field()
  name!: string;

  @OneToMany(() => Ad, (ad) => ad.category)
  @Field(() => [Ad])
  ads!: Ad[];

  constructor(category?: Partial<Category>) {
    super();

    if (category) {
      if (!category.name) {
        throw new Error("Category name cannot be empty.");
      }
      this.name = category.name;
    }
  }

  static async saveNewCategoryIfNotExisting(
    categoryData: Partial<Category>
  ): Promise<Category> {
    if (!categoryData.name) {
      throw new Error("Category name cannot be empty.");
    }
    const existingCategory = await Category.getCategoryByName(
      categoryData.name
    );
    if (existingCategory) {
      return existingCategory;
    }
    const newCategory = new Category(categoryData);
    const savedCategory = await newCategory.save();
    console.log(
      `New category saved: ${savedCategory.getStringRepresentation()}.`
    );
    return savedCategory;
  }

  static async initializeCategories(): Promise<void> {
    await Category.saveNewCategoryIfNotExisting({ id: 1, name: "Ameublement" });
    await Category.saveNewCategoryIfNotExisting({
      id: 2,
      name: "Électroménager",
    });
    await Category.saveNewCategoryIfNotExisting({
      id: 3,
      name: "Photographie",
    });
    await Category.saveNewCategoryIfNotExisting({
      id: 4,
      name: "Informatique",
    });
    await Category.saveNewCategoryIfNotExisting({ id: 5, name: "Téléphonie" });
    await Category.saveNewCategoryIfNotExisting({ id: 6, name: "Vélos" });
    await Category.saveNewCategoryIfNotExisting({ id: 7, name: "Véhicules" });
    await Category.saveNewCategoryIfNotExisting({ id: 8, name: "Sport" });
    await Category.saveNewCategoryIfNotExisting({ id: 9, name: "Habillement" });
    await Category.saveNewCategoryIfNotExisting({ id: 10, name: "Bébé" });
    await Category.saveNewCategoryIfNotExisting({ id: 11, name: "Outillage" });
    await Category.saveNewCategoryIfNotExisting({ id: 12, name: "Services" });
    await Category.saveNewCategoryIfNotExisting({ id: 13, name: "Vacances" });
  }

  static async getCategoryById(id: number): Promise<Category> {
    const category = await Category.findOneBy({ id });
    if (!category) {
      throw new Error(`Category with ID ${id} does not exist.`);
    }
    return category;
  }

  private static async getCategoryByName(
    name: string
  ): Promise<Category | null> {
    const category = await Category.findOneBy({ name });
    return category;
  }

  getStringRepresentation(): string {
    return `${this.id} | ${this.name}`;
  }
}

export default Category;
