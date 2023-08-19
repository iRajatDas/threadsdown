interface User {
  profile_pic_url: string;
  username: string;
  id: string | null;
  is_verified: boolean;
  pk: string;
}

interface MediaItem {
  height?: number;
  width?: number;
  url: string;
  type?: number;
  __typename?: string;
}

interface ThumbnailItem {
  height: number;
  width: number;
  url: string;
  __typename: string;
}

interface MediaData {
  photos?: MediaItem[];
  videos?: MediaItem[];
}

interface Thread {
  user: User;
  type: "photos" | "photo" | "videos" | "video" | "photos_and_videos";
  media: MediaData;
  width: number;
  height: number;
  caption: string;
  has_audio: boolean | null;
  taken_at: number;
  thumbnail?: ThumbnailItem[];
}

interface ThreadResponse {
  media: Thread[];
}
