import { db } from "@/lib/db";
import { saveImageToUploadsFolder } from "@/lib/imageSaveHandler";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized", status: 401 });
  }

  try {
    const formData = await req.formData();
    const file: File | null = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const storageImage = await saveImageToUploadsFolder({
      buffer,
      image: file,
    });

    let fileName: string;

    if (typeof storageImage == "string")
      fileName = (await saveImageToUploadsFolder({
        buffer,
        image: file,
      })) as string;
    else
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );

    const requestData = formData.get("billboard") as string;
    const productInfo = JSON.parse(requestData);
    const title = productInfo;

    if (!title || title.length < 4) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const billboard = await db?.billboard.create({
      data: {
        billboard: title,
        imageURL: fileName,
      },
    });
    return NextResponse.json({ msg: "Successful create billboard", billboard });
  } catch (error) {
    return NextResponse.json({ error: "Error uploading file" });
  }
}

export async function GET(req: Request) {
  try {
    const category = await db.billboard.findMany();
    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({
      error: "Error getting billboards.",
      status: 500,
    });
  }
}
