import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useUser } from "../context/UserContext";
import AvatarUploader from "./AvatarUploader"; 


export default function ProfileSettings() {
  const { user } = useUser();
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from("users")
        .select("display_name, bio, avatar_url")
        .eq("id", user.id)
        .single();
      if (error) console.error(error);
      else {
        setDisplayName(data.display_name || "");
        setBio(data.bio || "");
        setAvatarUrl(data.avatar_url || "");
      }
      setLoading(false);
    };
    fetchProfile();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    const { error } = await supabase
      .from("users")
      .update({ display_name: displayName, bio, avatar_url: avatarUrl })
      .eq("id", user.id);
    if (error) alert(error.message);
    else alert("Profile updated!");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
      <label className="block mb-2">Display Name</label>
      <input
        type="text"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        className="border rounded w-full p-2 mb-3"
      />
      <label className="block mb-2">Bio</label>
      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        className="border rounded w-full p-2 mb-3"
      />
      <h3 className="font-semibold mb-2">Profile Picture</h3>
      <AvatarUploader
        avatarUrl={avatarUrl}
        onUpload={async (url) => {
          setAvatarUrl(url);
          if (user) {
            const { error } = await supabase
              .from("users")
              .update({ avatar_url: url })
              .eq("id", user.id);
            if (error) console.error(error);
          }
        }}
      />
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save Changes
      </button>
    </div>
  );
}
