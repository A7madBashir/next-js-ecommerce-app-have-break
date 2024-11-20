import { readFile } from "fs/promises";
import { NextResponse } from "next/server";
import { join } from "path";

export async function GET(req: Request) {
  const queryParams = new URL(req.url);
  let url = queryParams.searchParams.get("url") || "";
  console.log("url: ", url);
  try {
    let dirPath = "tmp";
    if (url.includes("/_next/static")) {
	dirPath = "";
	url = url.replace("_next",".next");
    }

    let bufferImage: Buffer = await readFile(join(process.cwd(), dirPath, url));

    return new Response(bufferImage);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
