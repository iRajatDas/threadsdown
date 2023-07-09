import { exec } from "child_process";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Verify secret token here if you have set it up
  const { branch, commits } = await req.json();

  // Check if the branch and commit details match the desired conditions
  if (branch === "main" && commits.length > 0) {
    // Execute deployment commands
    exec(
      "cd /var/www/name_of_app && git pull && touch .env && pnpm build && pm2 restart instaThreadsDown --update-env",
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          return new NextResponse("Deployment failed.", {
            status: 500,
          });
        }
        console.log(`Deployment output: ${stdout}`);
        return new NextResponse("Deployment successful.", {
          status: 200,
        });
      }
    );
  } else {
    return new NextResponse("No action required.", {
      status: 200,
    });
  }
}
