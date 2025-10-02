export interface IKeomoji {
  aliases: string[];
  name: string;
  category: string | null;
  url: string;
}

export interface IKeomojiResponse {
  emojis: IKeomoji[];
}
