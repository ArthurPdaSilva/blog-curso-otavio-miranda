export const BASE_URL = process.env.BASE_API_URL ?? "http://localhost:3000";

export const REVALIDATE_MINUTES = 30 * 60;

export const IMAGE_UPLOAD_MAX_SIZE = 921600; //max 900kb
export const IMAGE_UPLOAD_DIRECTORY = "uploads";
export const IMAGE_SERVER_URL = `http://localhost:3000/${IMAGE_UPLOAD_DIRECTORY}`;
