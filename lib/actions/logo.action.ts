'use server'
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createSupabaseClient } from "../supabase";
import { v4 as uuidv4 } from "uuid";

export async function uploadFileAndGetUrl(file: File): Promise<string> {
  const { userId: author } = await auth();
  if (!author) {
    redirect("/sign-in");
  }

  // Initialize your Supabase client (ensure it's server-side compatible)
  const supabase = createSupabaseClient();

  // Generate a unique file name to avoid collisions
  const fileExtension = file.name.split(".").pop();
  const uniqueFileName = `${Date.now()}-${uuidv4()}-${Date.now()}.${fileExtension}`; // Use UUID and timestamp for uniqueness
  const filePath = `${uniqueFileName}`;

  console.log(`Attempting to upload file: ${filePath}`);

  // Upload the file to Supabase Storage
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("logos")
    .upload(filePath, file, {
      cacheControl: "3600", // Cache for 1 hour (adjust as needed)
      upsert: false, // Do not overwrite if a file with the exact name exists (uniqueFileName helps prevent this)
      contentType: file.type, // Set the correct MIME type for the file
    });

  if (uploadError) {
    console.error("Supabase file upload error:", uploadError);
    // You might want to log the error details to a monitoring service here
    throw new Error(`Failed to upload file: ${uploadError.message}`);
  }

  // Get the public URL of the uploaded file
  const { data: publicUrlData } = supabase.storage
    .from("logos")
    .getPublicUrl(filePath);

  if (!publicUrlData || !publicUrlData.publicUrl) {
    console.error(
      "Supabase public URL retrieval error: No public URL data found."
    );
    throw new Error("Failed to retrieve public URL for the uploaded file.");
  }

  console.log(`File uploaded successfully: ${publicUrlData.publicUrl}`);
  return publicUrlData.publicUrl;
}
