import axios from "axios";
import { ThreadsAPI } from "threads-api";

// photo video

// TYPES

interface Response {
  data: Nested_Data;
  extensions: Extensions;
}

interface Nested_Data {
  data: DataData;
}

interface DataData {
  edges: Edge[];
  page_info: PageInfo;
}

interface Edge {
  node: Node;
  cursor: string;
}

interface Node {
  thread_header_context: null;
  thread_items: ThreadItem[];
  thread_type: string;
  header: null;
  id: string;
  __typename: string;
}

interface ThreadItem {
  post: Post;
  reply_facepile_users: any[];
  line_type: string;
  should_show_replies_cta: boolean;
}

interface Post {
  pk: string;
  user: User;
  text_post_app_info: TextPostAppInfo;
  id: string;
  is_paid_partnership: null;
  is_fb_only: null;
  is_internal_only: null;
  code: string;
  carousel_media: CarouselMedia[] | null;
  image_versions2: ImageVersions2;
  original_height: number;
  original_width: number;
  video_versions: PostVideoVersion[] | null;
  like_count: number;
  audio: null;
  caption: Caption;
  caption_is_edited: boolean;
  transcription_data: null;
  accessibility_caption: null;
  has_audio: null;
  media_type: number;
  has_liked: boolean;
  caption_add_on: null;
  media_overlay_info: null;
  giphy_media_info: null;
  text_with_entities: null;
  taken_at: number;
  organic_tracking_token: string;
  like_and_view_counts_disabled: boolean;
}

interface PostVideoVersion {
  type: number;
  url: string;
}
interface Caption {
  text: string;
}

interface CarouselMedia {
  accessibility_caption: null | string;
  has_audio: null;
  image_versions2: ImageVersions2;
  original_height: number;
  original_width: number;
  pk: string;
  video_versions: VideoVersion[] | null;
  id: string;
  code: null;
}

interface ImageVersions2 {
  candidates: Candidate[];
}

interface Candidate {
  url: string;
  height: number;
  width: number;
}

interface VideoVersion {
  type: number;
  url: string;
  __typename: string;
}

interface TextPostAppInfo {
  is_post_unavailable: boolean;
  pinned_post_info: PinnedPostInfo;
  share_info: ShareInfo;
  reply_to_author: null;
  direct_reply_count: number;
  repost_count: number;
  hush_info: null;
  can_reply: boolean;
  special_effects_enabled_str: string;
  is_reply: boolean;
  link_preview_attachment: null;
  fediverse_info: null;
  post_unavailable_reason: null;
}

interface PinnedPostInfo {
  is_pinned_to_profile: boolean;
  is_pinned_to_parent_post: boolean;
}

interface ShareInfo {
  reposted_post: null;
  quoted_post: null;
  __typename: string;
  can_quote_post: boolean;
  can_repost: boolean;
  is_reposted_by_viewer: boolean;
  repost_restricted_reason: string;
}

interface User {
  friendship_status: null;
  id: null;
  pk: string;
  transparency_label: null;
  transparency_product: null;
  transparency_product_enabled: boolean;
  is_verified: boolean;
  username: string;
  eligible_for_text_app_activation_badge: boolean;
  hide_text_app_activation_badge_on_text_app: null;
  profile_pic_url: string;
}

interface PageInfo {
  has_next_page: boolean;
  has_previous_page: boolean;
  end_cursor: null;
  start_cursor: null;
}

interface Extensions {
  is_final: boolean;
}

const threadsAPI = new ThreadsAPI({
  deviceID: "android-2vhi2rsxehy00000",
  username: "rajatdas.me",
  password: "rajatdas@123#S$",
});

const BASE_API_URL = "https://www.threads.net/api/graphql" as const;

const _cleanUrl = (url: string): string => {
  url = url.split("?")[0];
  const lastDigit = url[url.length - 1];
  const isURLClean = lastDigit == "?" || lastDigit == "/";
  if (isURLClean) return _cleanUrl(url.substring(0, url.length - 1));
  return url;
};

const _getThreadId = (url: string) => {
  return url.split("/")[url.split("/").length - 1];
};

const _getPostId = (url: string) => {
  try {
    url = _cleanUrl(url);
    let threadID = _getThreadId(url);
    threadID = threadID.split("?")[0];
    threadID = threadID.replace(/\s/g, "");
    threadID = threadID.replace(/\//g, "");
    const alphabet =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
    let postID: bigint = 0n;
    for (const letter of threadID) {
      postID = postID * 64n + BigInt(alphabet.indexOf(letter));
    }
    return postID.toString();
  } catch (err) {
    return null;
  }
};

const _getPostData = async (
  postId: string,
  i: number = 0
): Promise<Node | null> => {
  try {
    const response = await axios.request<Response>({
      method: "POST",
      data: `av=0&__user=0&__a=1&__req=r&__hs=19848.HYP%3Abarcelona_web_pkg.2.1..0.0&dpr=2&__ccg=EXCELLENT&__rev=1013282726&__s=ofka76%3Agziv5m%3Ahv3m3o&__hsi=7365566978295196000&__dyn=7xeUmwlEnwn8K2Wmh0cm5U4e0yoW3q32360CEbo1nEhw2nVE4W0om782Cw8G11wBz81s8hwGwQw9m1YwBgao6C0Mo2swlo5qfK0EUjwGzE2swwwNwKwHw8Xxm16wa-7U88138bodEGdwtU2ewbS1LwTwKG0hq1Iwqo9EpwUwiVUdGgkyU8UaUuxq328Dxd1W&__csr=gil_uICZtiFf_ivkyUhmRXZVmHmueAAG_BzQVE01EwofVB82QlgyrcUYwN65k36ut2FkMzyFAycWaxEmwkZ16fA980aPU1Pk05ZjwZxgl80jIw&__comet_req=29&lsd=AVomI7t1kdg&jazoest=2974&__spin_r=1013282726&__spin_b=trunk&__spin_t=1714929700&__jssesw=1&fb_api_caller_class=RelayModern&fb_api_req_friendly_name=BarcelonaPostPageQuery&variables=%7B%22postID%22%3A%22${postId}%22%2C%22__relay_internal__pv__BarcelonaIsLoggedInrelayprovider%22%3Afalse%2C%22__relay_internal__pv__BarcelonaIsOriginalPostPillEnabledrelayprovider%22%3Afalse%2C%22__relay_internal__pv__BarcelonaIsThreadContextHeaderEnabledrelayprovider%22%3Afalse%2C%22__relay_internal__pv__BarcelonaIsThreadContextHeaderFollowButtonEnabledrelayprovider%22%3Afalse%2C%22__relay_internal__pv__BarcelonaUseCometVideoPlaybackEnginerelayprovider%22%3Afalse%2C%22__relay_internal__pv__BarcelonaOptionalCookiesEnabledrelayprovider%22%3Atrue%2C%22__relay_internal__pv__BarcelonaIsViewCountEnabledrelayprovider%22%3Afalse%2C%22__relay_internal__pv__BarcelonaShouldShowFediverseM075Featuresrelayprovider%22%3Afalse%7D&server_timestamps=true&doc_id=25654720644126464`,

      url: BASE_API_URL,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "x-asbd-id": "129477",
        "x-fb-friendly-name": "BarcelonaPostPageQuery",
        "x-fb-lsd": "AVomI7t1kdg",
        "x-ig-app-id": "238260118697367",
      },
    });
    const [threads] = response?.data?.data?.data?.edges;
    return threads?.node;
  } catch (err) {
    if (i < 2) return await _getPostData(postId, i++);
    return null;
  }
};

const _getMedia = (thread: ThreadItem) => {
  let media = thread.post;

  // console.log("media", media);

  media = media.text_post_app_info.share_info.quoted_post
    ? media.text_post_app_info.share_info.quoted_post
    : media; // quoted post
  media = media.text_post_app_info.share_info.reposted_post
    ? media.text_post_app_info.share_info.reposted_post
    : media; // reposted post

  const hasVideo = media.carousel_media?.some(
    (item) => item.video_versions && item.video_versions.length > 0
  );

  const hasPhoto = media.carousel_media?.some(
    (item) =>
      item.image_versions2 &&
      item.image_versions2.candidates.length > 0 &&
      item.video_versions === null
  );

  // console.table({
  //   hasVideo,
  //   hasPhoto,
  // });

  if (hasPhoto && hasVideo) {
    if (!media.carousel_media) {
      return;
    }

    const videos = media?.carousel_media
      .filter((item) => item.video_versions && item.video_versions.length > 0)
      .map(
        (item) =>
          item.video_versions && {
            url: item.video_versions[0].url,
            height: item.original_height,
            width: item.original_width,
            hasAudio: item.has_audio,
          }
      );

    const photos = media.carousel_media
      .filter(
        (item) =>
          item.image_versions2 && item.image_versions2.candidates.length > 0
      )
      .map((item) => ({
        url: item.image_versions2.candidates[0].url,
        height: item.original_height,
        width: item.original_width,
      }));

    return {
      user: media.user,
      type: "photos_and_videos",
      media: { photos, videos },
      width: media.original_width,
      height: media.original_height,
      caption: media.caption ? media.caption.text : "",
      has_audio: media.has_audio,
      taken_at: media.taken_at,
    };
  }

  // const filterVideos =
  //   media.carousel_media &&
  //   media.carousel_media.filter(
  //     (item) => item.video_versions && item.video_versions.length > 0
  //   );

  if (hasVideo) {
    if (!media.carousel_media) {
      return;
    }

    return {
      user: media.user,
      type: "videos",
      media: media.carousel_media
        .filter((item) => item.video_versions && item.video_versions.length > 0)
        .map((item) => item.video_versions && item.video_versions[0]),
      width: media.original_width,
      height: media.original_height,
      caption: media.caption ? media.caption.text : "",
      has_audio: media.has_audio,
      taken_at: media.taken_at,
    };
  }

  if (hasPhoto) {
    if (!media.carousel_media) {
      return;
    }
    return {
      user: media.user,
      type: "photos",
      media: media.carousel_media
        .filter(
          (item) =>
            item.image_versions2 && item.image_versions2.candidates.length > 0
        )
        .map((item) => item.image_versions2.candidates[0]),
      width: media.original_width,
      height: media.original_height,
      caption: media.caption ? media.caption.text : "",
      has_audio: media.has_audio,
      taken_at: media.taken_at,
    };
  }

  if (media && media.video_versions && media.video_versions.length > 0) {
    let thumbnail = media.image_versions2.candidates.filter(
      (img) =>
        img.width == media.original_width && img.height == media.original_height
    );
    thumbnail =
      thumbnail.length > 0 ? thumbnail : [media.image_versions2.candidates[0]];

    return {
      user: media.user,
      type: "video",
      media: media.video_versions[0],
      width: media.original_width,
      height: media.original_height,
      caption: media.caption ? media.caption.text : "",
      has_audio: media.has_audio,
      taken_at: media.taken_at,
      thumbnail,
    };
  }

  let medtest = media.image_versions2.candidates.filter(
    (img) =>
      img.width === media.original_width && img.height === media.original_height
  );

  medtest = medtest.length >= 1 ? medtest : [];
  medtest = media.image_versions2.candidates[0]
    ? [media.image_versions2.candidates[0]]
    : medtest;

  if (media.video_versions === null && media.carousel_media === null) {
    return {
      user: media.user,
      type: "photo",
      media: medtest,
      width: media.original_width,
      height: media.original_height,
      caption: media.caption ? media.caption.text : "",
      has_audio: media.has_audio,
      taken_at: media.taken_at,
    };
  }
};

export const getAllMedia = async (url: string): Promise<any> => {
  try {
    let postId = _getPostId(_cleanUrl(url));
    if (!postId) return { msg: "invalid url" };

    let postData = await _getPostData(postId);
    if (!postData) return { msg: "invalid url or blocked." };

    let threadItems: ThreadItem[] = postData?.thread_items || [];

    if (threadItems.length === 0 || !threadItems[0]?.post?.user)
      return { msg: "thread user invalid / inactive" };

    let uname = threadItems[0].post.user.username || "err";

    let allMedia: any[] = threadItems.map((thread) => {
      return _getMedia(thread);
    });

    // if (postData.thread_items[0] && postData.reply_threads.length > 0) {
    //   let contThread = postData.reply_threads[0] || null;

    //   if (
    //     contThread &&
    //     contThread.thread_items.length > 0 &&
    //     contThread.thread_items[0].post.user.username === uname
    //   ) {
    //     contThread.thread_items = contThread.thread_items.filter(
    //       (t) => t.post.user.username === uname
    //     );

    //     if (contThread.thread_items.length > 0) {
    //       allMedia = [
    //         ...allMedia,
    //         ...contThread.thread_items.map((t) => _getMedia(t)),
    //       ];
    //     }
    //   }
    // }

    return { media: allMedia, postData };
  } catch (err) {
    console.log(err);
    return { msg: "unknown error", error: err };
  }
};

const getUserID = async (username: string): Promise<string | null> => {
  const userID = await threadsAPI.getUserIDfromUsername(username);
  return userID || null;
};

export const getUserProfile = async (username: string): Promise<any | null> => {
  const userID = await getUserID(username);

  if (!userID) {
    return null;
  }

  const user = await threadsAPI.getUserProfile(userID);
  return user || null;
};
