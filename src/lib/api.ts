// // api.ts
// import axios from "axios";
// import { ThreadsUser } from "threads-api";

// export const fetchThreadsData = async (
//   url: string
// ): Promise<ThreadResponse> => {
//   try {
//     const response = await axios.get<ThreadResponse>(url);
//     return response.data;
//   } catch (err) {
//     throw new Error("Error fetching data::");
//   }
// };

// interface Thread {
//   user: ThreadsUser;
//   type: string;
//   media: Media[];
//   width: number;
//   height: number;
//   caption: string;
//   has_audio: boolean;
//   taken_at: number;
//   thumbnail?: ImageCandidate[];
// }

// export interface ThreadResponse {
//   media: Thread[];
// }

// interface Media {
//   photos?: ImageCandidate[];
//   videos?: VideoVersion[];
// }

// interface ImageCandidate {
//   url: string;
//   height: number;
//   width: number;
// }

// interface VideoVersion {
//   type: number;
//   url: string;
//   __typename: string;
// }
