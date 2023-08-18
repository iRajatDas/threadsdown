import { Caption, Post, Thread, ThreadsAPI, ThreadsUser } from "threads-api";

enum ProcessedResultType {
  SingleVideo = "Single Video",
  SinglePhoto = "Single Photo",
  MultiplePhotos = "Multiple Photos",
  MultipleVideos = "Multiple Videos",
  PhotoAndVideo = "Photo(s) and Video(s) (Mixed)",
  Unknown = "Unknown",
}

interface Media {
  type: "image" | "video" | "images" | "videos";
  url: string;
  height: number;
  width: number;
}

interface ProcessedResult {
  type: ProcessedResultType;
  caption?: Caption | null | undefined;
  user?: ThreadsUser;
  media?: Media[];
}

const threadsAPI = new ThreadsAPI({
  deviceID: "android-2vhi2rsxehy00000",
  username: "rajatdas.me",
  password: "rajatdas@123#S$",
});

async function getPostId(ThreadId: string) {
  const postId = await threadsAPI.getPostIDfromThreadID(ThreadId);
  if (!postId) {
    throw new Error(`Failed to fetch post ID for Thread ID: ${ThreadId}`);
  }
  return postId;
}

async function getPostDetailsWithoutId(threadId: string) {
  const postID = await threadsAPI.getPostIDfromURL(threadId);
  if (!postID) {
    return null;
  }

  const postData = await threadsAPI.getThreads(postID);
  if (!postData) {
    console.log(`Failed to fetch post data for Thread ID: ${threadId}`);
    return null;
  }
  return postData;
}

export async function GET(request: Request) {
  const origin = request.headers.get("host");
  const allowedDomains = ["localhost:3000", "instathreadsdown.com"];

  if (!origin || !allowedDomains.includes(origin)) {
    return new Response("Not Allowed", {
      status: 403,
    });
  }

  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return new Response("Threads URL missing.", {
      status: 403,
    });
  }

  const data = await getPostDetailsWithoutId(url);
  if (!data) {
    return new Response("Something went wrong with the request.", {
      status: 404,
    });
  }

  function processApiResponse(apiResponse: {
    containing_thread: Thread;
    reply_threads?: Thread[] | undefined;
  }): ProcessedResult {
    const threadItems = apiResponse.containing_thread.thread_items;

    let hasSinglePhoto = false;
    let hasSingleVideo = false;
    let hasMultipleVideo = false;
    let hasMultiplePhoto = false;

    for (const threadItem of threadItems) {
      const post = threadItem.post;

      let hasMultipleVideoVersions = false;

      if (post.carousel_media) {
        for (const item of post?.carousel_media) {
          if (item.video_versions.length > 1) {
            hasMultipleVideoVersions = true;
            break; // Exit the loop as soon as a match is found
          }
        }
      }

      // Check if single photo
      if (
        post.image_versions2 &&
        post.image_versions2.candidates.length > 0 &&
        post.video_versions.length === 0 &&
        post.carousel_media_count === null
      ) {
        hasSinglePhoto = true;
      }

      // Check if single video
      if (
        post.video_versions &&
        post.video_versions.length > 0 &&
        post.carousel_media_count === null
      ) {
        hasSingleVideo = true;
      }

      // Check if mutliple photo
      if (
        post.video_versions &&
        post.video_versions.length === 0 &&
        post.carousel_media_count >= 0 &&
        !hasMultipleVideoVersions
      ) {
        hasMultiplePhoto = true;
      }

      // Check if mutliple video
      if (
        post.video_versions &&
        post.video_versions.length === 0 &&
        post.carousel_media_count >= 1 &&
        hasMultipleVideoVersions &&
        !hasMultiplePhoto
      ) {
        hasMultipleVideo = true;
      }
    }

    const post = threadItems[0].post;

    if (hasSinglePhoto)
      return {
        type: ProcessedResultType.SinglePhoto,
        user: post.user,
        caption: post.caption,
        media: [
          {
            type: "image",
            height: post.image_versions2.candidates[0].height,
            width: post.image_versions2.candidates[0].width,
            url: post.image_versions2.candidates[0].url,
          },
        ],
      };
    else if (hasMultiplePhoto) {
      return {
        type: ProcessedResultType.MultiplePhotos,
        user: post.user,
        caption: post.caption,
        media: post.carousel_media.map((photo) => {
          // console.log(photo.image_versions2);
          return {
            type: "images",
            height: photo.original_height || 0,
            width: photo.original_width || 0,
            url: photo.image_versions2.candidates[0]?.url || "",
          };
        }),
      };
    } else if (hasSingleVideo)
      return {
        type: ProcessedResultType.SingleVideo,
        user: post.user,
        caption: post.caption,
        media: [
          {
            type: "video",
            height: post.video_versions[0].original_height || 0,
            width: post.video_versions[0].original_width || 0,
            url: post.video_versions[0]?.url || "",
          },
        ],
      };
    else if (hasMultipleVideo)
      return {
        type: ProcessedResultType.MultipleVideos,
        user: post.user,
        caption: post.caption,
        media: post.carousel_media.map((video) => {
          console.log(video);
          return {
            type: "videos",
            height: video.original_height || 0,
            width: video.original_width || 0,
            url: video.video_versions[0]?.url || "",
          };
        }),
      };
    else return { type: ProcessedResultType.PhotoAndVideo };
  }

  const processedResult = processApiResponse(data);

  return new Response(JSON.stringify({ processedResult, data }), {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Credentials": "true",
    },
  });
}
