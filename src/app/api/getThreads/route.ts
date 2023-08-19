import { getAllMedia } from "@/lib/threads";


enum ProcessedResultType {
  SingleVideo = "single_video",
  SinglePhoto = "single_photo",
  MultiplePhotos = "multiple_photos",
  MultipleVideos = "multiple_videos",
  PhotoAndVideo = "photo_video",
  Unknown = "unknown",
}

// async function getPostId(ThreadId: string) {
//   const postId = await threadsAPI.getPostIDfromThreadID(ThreadId);
//   if (!postId) {
//     throw new Error(`Failed to fetch post ID for Thread ID: ${ThreadId}`);
//   }
//   return postId;
// }

// async function getPostDetailsWithoutId(threadId: string) {
//   const postID = await threadsAPI.getPostIDfromURL(threadId);
//   if (!postID) {
//     return null;
//   }

//   const postData = await threadsAPI.getThreads(postID);
//   if (!postData) {
//     console.log(`Failed to fetch post data for Thread ID: ${threadId}`);
//     return null;
//   }
//   return postData;
// }

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

  const postData = await getAllMedia(url);
  if (!postData) {
    return new Response("Something went wrong with the request.", {
      status: 404,
    });
  }

  return new Response(JSON.stringify(postData), {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Credentials": "true",
    },
  });
}
