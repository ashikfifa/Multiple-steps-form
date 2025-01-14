import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const FormMultiApi=async()=>{
  try {
    const response = await axios.post(ApiRoutes.MULTISTEPFORM, { finalData });
    return response.data;
  } catch (error) {
    console.error("Error in creating form:", error);
    throw error;
  }
}