export interface IPost {
  id: number;
  title: string;
  body: string;
  createdAt: Date;
  updatedAt?: Date;
}
