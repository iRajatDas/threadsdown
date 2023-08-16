import { ThreadsAPI } from "threads-api";

const threadsAPI = new ThreadsAPI({
  deviceID: "android-2vhi2rsxehy00000",
  username: "rajatdas.me",
  password: "rajatdas@123#S$"
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
  console.log("🚀 ~ file: route.ts:47 ~ GET ~ data:", typeof data, data);

  if (!data) {
    return new Response("Something went wrong with the request.", {
      status: 404,
    });
  }

  const media = data?.containing_thread.thread_items.map((thread) => {
    let mediaItem = thread.post;
    mediaItem =
      mediaItem.text_post_app_info.share_info.quoted_post ||
      mediaItem.text_post_app_info.share_info.reposted_post ||
      mediaItem;

    if (mediaItem.carousel_media) {
      const carouselMedia = mediaItem.carousel_media;
      const videos = carouselMedia.filter((item) => item.video_versions);
      const photos = carouselMedia.filter((item) => !item.video_versions);

      if (videos.length > 0) {
        return {
          user: mediaItem.user,
          type: "videos",
          media: videos.map((item) => item.video_versions[0]),
          photos: videos.map(
            (item) => item.image_versions2.candidates[0] || []
          ),
          width: mediaItem.original_width,
          height: mediaItem.original_height,
        };
      } else if (photos.length > 0) {
        return {
          user: mediaItem.user,
          type: "photos",
          media: photos.map((item) => item.image_versions2.candidates[0]),
          width: mediaItem.original_width,
          height: mediaItem.original_height,
        };
      }
    }

    if (mediaItem.video_versions && mediaItem.video_versions.length > 0) {
      return {
        user: mediaItem.user,
        type: "videos",
        media: [...mediaItem.video_versions],
        width: mediaItem.original_width,
        height: mediaItem.original_height,
      };
    }
  });

  return new Response(JSON.stringify(media), {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Credentials": "true",
    },
  });
}
