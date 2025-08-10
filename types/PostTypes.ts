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
  categoryName: string;
  title: string;
  thumbnailImgUrl: string | null;
  body: string;
  createdAt: Date;
  updatedAt: Date | null;
}
