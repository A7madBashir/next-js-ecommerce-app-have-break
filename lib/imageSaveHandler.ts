import { mkdir, stat, writeFile } from "fs/promises";
import { join } from "path";
import mime from "mime";

export async function saveImageToUploadsFolder({
  buffer,
  image,
}: {
  buffer: Buffer;
  image: File;
}): Promise<string | Error> {
  const relativeUploadDir = `/uploads/${new Date(Date.now())
    .toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-")}`;
  const uploadDir = join(process.cwd(), "public", relativeUploadDir);
  try {
    await stat(uploadDir);
  } catch (e: any) {
    if (e.code === "ENOENT") {
      // This is for checking the directory is exist (ENOENT : Error No Entry)
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error(
        "Error while trying to create directory when uploading a file\n",
        e
      );

      throw new Error("Failed to store image");
    }
  }

  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const filename = `${image.name.replace(
    /\.[^/.]+$/,
    ""
  )}-${uniqueSuffix}.${mime.getExtension(image.type)}`;
  await writeFile(`${uploadDir}/${filename}`, new Uint8Array(buffer));
  const fileUrl = `${relativeUploadDir}/${filename}`;

  return fileUrl;
}
