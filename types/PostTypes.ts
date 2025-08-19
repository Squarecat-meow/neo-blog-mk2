import { IUser } from './UserType';

export interface ICategory {
  id: number;
  name: string;
  categoryOwner: IUser;
  parentCategory?: ICategory;
  subCategories?: ICategory[];
}

export interface IPost {
  id: number;
  categoryId: number;
  title: string;
  thumbnailImgUrl: string | null;
  body: string;
  summary: string;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface IPostWithCategory extends IPost {
  category: {
    name: string;
  };
}
