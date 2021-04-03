export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  isFavorite?: boolean;
  albumTitle?: string | null;
}
