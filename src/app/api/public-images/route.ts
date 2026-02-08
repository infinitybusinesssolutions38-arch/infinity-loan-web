import { NextResponse } from "next/server";
import path from "path";
import { readdir } from "fs/promises";

export async function GET() {
  try {
    const imagesDir = path.join(process.cwd(), "public", "images");
    const entries = await readdir(imagesDir, { withFileTypes: true });

    const files = entries
      .filter((e) => e.isFile())
      .map((e) => e.name)
      .filter((name) => name && !name.startsWith("."))
      .filter((name) => name.toLowerCase() !== ".png")
      .filter((name) => /\.(png|jpe?g|webp|gif|svg)$/i.test(name));

    return NextResponse.json({ files });
  } catch (error) {
    return NextResponse.json(
      { files: [], error: "Failed to read images folder" },
      { status: 500 }
    );
  }
}
