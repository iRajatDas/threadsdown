import { ThreadsAPI } from "threads-api";

const threadsAPI = new ThreadsAPI({
  deviceID: "android-2vhi2rsxehy00000",
  username: "rajatdas.me",
  password: "rajatdas@123#S$",
});

const cleanUrl = (url) => {
  url = url.split("?")[0];
  if (url[url.length - 1] == "?" || url[url.length - 1] == "/")
    return cleanUrl(url.substring(0, url.length - 1));
  return url;
};

const getPostId = (url) => threadsAPI.getPostIDfromURL(url);

const getPostData = async (postId) => {
  try {
    let postData = await threadsAPI.getThreads(postId);
    return postData;
  } catch (err) {
    console.log("Error on getPostData", err);
    return null;
  }
};

export const getAllMedia = async (url: string): Promise<any> => {
  try {
    let postId = getPostId(url);
    if (!postId) return { msg: "invalid url" };

    let postData = await getPostData(postId);
    if (!postData) return { msg: "invalid url or blocked." };

    let threadItems = postData.containing_thread?.thread_items || [];

    if (threadItems.length === 0 || !threadItems[0]?.post?.user)
      return { msg: "thread user invalid / inactive" };

    let uname = threadItems[0].post.user.username || "err";

    let allMedia: any[] = threadItems.map((thread) => {
      return getMedia(thread);
    });

    if (postData.reply_threads && postData.reply_threads.length > 0) {
      let contThread = postData.reply_threads[0] || null;

      if (
        contThread &&
        contThread.thread_items.length > 0 &&
        contThread.thread_items[0].post.user.username === uname
      ) {
        contThread.thread_items = contThread.thread_items.filter(
          (t) => t.post.user.username === uname
        );

        if (contThread.thread_items.length > 0) {
          allMedia = [
            ...allMedia,
            ...contThread.thread_items.map((t) => getMedia(t)),
          ];
        }
      }
    }

    return { media: allMedia, postData };
  } catch (err) {
    console.log(err);
    return { msg: "unknown error", error: err };
  }
};

const getMedia = (thread) => {
  let media = thread.post;
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
    (item) => item.image_versions2 && item.image_versions2.candidates.length > 0
  );

  if (hasVideo && hasPhoto) {
    const videos = media.carousel_media
      .filter((item) => item.video_versions && item.video_versions.length > 0)
      .map((item) => item.video_versions[0]);

    const photos = media.carousel_media
      .filter(
        (item) =>
          item.image_versions2 && item.image_versions2.candidates.length > 0
      )
      .map((item) => item.image_versions2.candidates[0]);

    if (videos.length === photos.length) {
      return {
        user: media.user,
        type: "videos",
        media: media.carousel_media
          .filter(
            (item) => item.video_versions && item.video_versions.length > 0
          )
          .map((item) => item.video_versions[0]),
        width: media.original_width,
        height: media.original_height,
        caption: media.caption ? media.caption.text : "",
        has_audio: media.has_audio,
        taken_at: media.taken_at,
      };
    }

    const photos_ = media.carousel_media
      .filter((item) => {
        return (
          item.image_versions2 &&
          item.image_versions2.candidates.length > 0 &&
          item.video_versions.length === 0
        );
      })
      .map((item) => ({
        url: item.image_versions2.candidates[0].url,
        height: item.original_height,
        width: item.original_width,
      }));

    return {
      user: media.user,
      type: "photos_and_videos",
      media: { photos: photos_, videos },
      width: media.original_width,
      height: media.original_height,
      caption: media.caption ? media.caption.text : "",
      has_audio: media.has_audio,
      taken_at: media.taken_at,
    };
  }

  if (hasVideo) {
    return {
      user: media.user,
      type: "videos",
      media: media.carousel_media
        .filter((item) => item.video_versions && item.video_versions.length > 0)
        .map((item) => item.video_versions[0]),
      width: media.original_width,
      height: media.original_height,
      caption: media.caption ? media.caption.text : "",
      has_audio: media.has_audio,
      taken_at: media.taken_at,
    };
  }

  if (hasPhoto) {
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
      img.width == media.original_width && img.height == media.original_height
  );
  medtest = medtest.length >= 1 ? medtest : [];
  medtest = media.image_versions2.candidates[0]
    ? [media.image_versions2.candidates[0]]
    : medtest;

  if (
    media.video_versions &&
    media.video_versions.length === 0 &&
    media.carousel_media_count === null
  ) {
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
