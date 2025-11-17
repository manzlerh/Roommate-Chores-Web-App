import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useUser } from "../context/UserContext";

type Props = {
  avatarUrl?: string;
  onUpload: (url: string) => void;
};

export default function AvatarUploader({ avatarUrl, onUpload }: Props) {
  const { user } = useUser();
  const [uploading, setUploading] = useState(false);

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!user) throw new Error("You must be logged in to upload");
      if (!event.target.files || event.target.files.length === 0)
        throw new Error("Please select an image file.");

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${user.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
      onUpload(data.publicUrl);
    } catch (error: unknown) {
      let message = "An unexpected error occurred.";
      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === "string") {
        message = error;
      }
      alert(message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="Avatar"
          className="rounded-full w-24 h-24 object-cover border"
        />
      ) : (
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">No Avatar</span>
        </div>
      )}

      <label className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer">
        {uploading ? "Uploading..." : "Upload New"}
        <input
          type="file"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
          className="hidden"
        />
      </label>
    </div>
  );
}
