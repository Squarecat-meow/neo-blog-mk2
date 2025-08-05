export interface IPost {
  id: number;
  categoryName: string;
  title: string;
  thumbnailImgUrl: string | null;
  body: string;
  createdAt: Date;
  updatedAt: Date | null;
}
