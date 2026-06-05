import axios from "axios";

export const CLOUDINARY_SIGNATURE_TIMEOUT_MS = 90000;
export const CLOUDINARY_UPLOAD_TIMEOUT_MS = 180000;

export type CloudinarySignature = {
  cloudName: string;
  apiKey: string;
  timestamp: number;
  folder: string;
  signature: string;
};

const signaturePromiseCache = new Map<string, Promise<CloudinarySignature>>();

export async function getCloudinarySignature(
  folder: string
): Promise<CloudinarySignature> {
  const cached = signaturePromiseCache.get(folder);
  if (cached) return cached;

  const promise = (async () => {
    let res;
    try {
      res = await axios.post(
        "/api/cloudinary-signature",
        { folder },
        { timeout: CLOUDINARY_SIGNATURE_TIMEOUT_MS }
      );
    } catch (err) {
      signaturePromiseCache.delete(folder);
      if (axios.isAxiosError(err)) {
        const data: unknown = err.response?.data;
        const msg =
          (data as { message?: string })?.message ||
          (typeof data === "string" ? data : "") ||
          err.message;
        throw new Error(`Cloudinary signature failed: ${msg}`);
      }
      throw err;
    }

    if (!res?.data?.success) {
      signaturePromiseCache.delete(folder);
      throw new Error(res?.data?.message || "Failed to get upload signature");
    }

    return res.data as CloudinarySignature;
  })();

  signaturePromiseCache.set(folder, promise);
  return promise;
}

export async function uploadFileToCloudinary(
  file: File,
  folder: string
): Promise<string> {
  const sig = await getCloudinarySignature(folder);
  const uploadUrl = `https://api.cloudinary.com/v1_1/${sig.cloudName}/auto/upload`;

  const fd = new FormData();
  fd.append("file", file);
  fd.append("api_key", sig.apiKey);
  fd.append("timestamp", String(sig.timestamp));
  fd.append("folder", sig.folder);
  fd.append("signature", sig.signature);

  try {
    const uploadRes = await axios.post(uploadUrl, fd, {
      timeout: CLOUDINARY_UPLOAD_TIMEOUT_MS,
      headers: { "Content-Type": "multipart/form-data" },
    });

    const secureUrl = uploadRes?.data?.secure_url;
    if (!secureUrl || typeof secureUrl !== "string") {
      throw new Error("Cloud upload failed");
    }
    return secureUrl;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const data: unknown = err.response?.data;
      const cloudMsg =
        (data as { error?: { message?: string }; message?: string })?.error
          ?.message ||
        (data as { message?: string })?.message ||
        (typeof data === "string" ? data : "");
      const finalMsg = cloudMsg
        ? `Cloudinary upload failed: ${cloudMsg}`
        : `Cloudinary upload failed: ${err.message}`;
      throw new Error(finalMsg);
    }
    throw err;
  }
}

export function resetCloudinarySignatureCache(): void {
  signaturePromiseCache.clear();
}