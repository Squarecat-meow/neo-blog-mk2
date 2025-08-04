export interface IPost {
  id: number;
  category: string;
  title: string;
  thumbnailImgUrl?: string;
  body: string;
  createdAt: Date;
  updatedAt?: Date;
}
