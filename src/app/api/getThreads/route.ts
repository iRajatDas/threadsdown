import { ThreadsAPI } from "threads-api";

const threadsAPI = new ThreadsAPI({
  username: "rajatdas.me",
  password: "rajatdas@123#S$",
  deviceID: "android-2vhi2rsxehy00000",
});

async function getPostId(ThreadId) {
  const postId = await threadsAPI.getPostIDfromThreadID(ThreadId);
  if (!postId) {
    throw new Error("Failed to fetch data");
  }
  return postId;
}

async function getPostDetailsWithoutId({ threadId }: { threadId: string }) {
  const postID = await threadsAPI.getPostIDfromURL(threadId!!);
  if (!postID) {
    return;
  }
  const postData = await threadsAPI.getThreads(postID);
  if (!postData) {
    throw new Error("Failed to fetch data");
  }
  return postData;
}

export async function GET(request: Request) {
  const origin = request.headers.get("host");
  const allowedDomains = ["localhost:3000", "instathreadsdown.com"];

  // Check if the request's origin is in the list of allowed domains
  if (origin && allowedDomains.includes(origin)) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url") as string;

    console.log(url);

    const data = await getPostDetailsWithoutId({
      threadId: url,
    });

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } else {
    // If the domain is not allowed, respond with a "Not Allowed" message
    return new Response("Not Allowed", {
      status: 403, // Forbidden status
    });
  }
}
