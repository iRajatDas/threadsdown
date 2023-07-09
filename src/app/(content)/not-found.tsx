"use client"
import ErrorPage from "next/error";
// import { useParams } from "next/navigation";

export default function NotFound() {
  // const params = useParams()
  return (
    <>
      {/* <title>Not Found | Insta Threads Down</title> */}
      <ErrorPage statusCode={404} title="Items not found" />
    </>
  );
}
