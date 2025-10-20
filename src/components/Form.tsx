import { useEffect, useState, useRef } from "react";
import { uploadImageToCloudinary, type Gadget } from "../utils/api";

interface Props {
  onSubmit: (gadget: Partial<Gadget>) => void;
  editingGadget: Gadget | null;
}

const Form: React.FC<Props> = ({ onSubmit, editingGadget }) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [capacity, setCapacity] = useState("");
  const [image, setImage] = useState(""); // holds final image URL
  const [preview, setPreview] = useState(""); // holds preview (Base64 or URL)
  const fileRef = useRef<HTMLInputElement>(null); // reference to file input

  // Load gadget info if editing
  useEffect(() => {
    if (editingGadget) {
      setName(editingGadget.name || "");
      setColor(editingGadget.data?.color || "");
      setCapacity(editingGadget.data?.capacity || "");
      setImage(editingGadget.image || "");
      setPreview(editingGadget.image || "");
    } else {
      setName("");
      setColor("");
      setCapacity("");
      setImage("");
      setPreview("");
    }
  }, [editingGadget]);

  // Handle file uploads
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file)); // show preview immediately
    try {
      const uploadedUrl = await uploadImageToCloudinary(file);
      setImage(uploadedUrl); // save Cloudinary URL
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let finalImage = image.trim();

    // If user selected a file but image not uploaded yet, upload it
    if (!finalImage && fileRef.current?.files?.[0]) {
      try {
        finalImage = await uploadImageToCloudinary(fileRef.current.files[0]);
      } catch (err) {
        console.error("Upload failed:", err);
      }
    }

    // Fallback default image
    if (!finalImage) {
      finalImage =
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80";
    }

    // Submit gadget data
    onSubmit({ name, image: finalImage, data: { color, capacity } });

    // Reset form
    setName("");
    setColor("");
    setCapacity("");
    setImage("");
    setPreview("");
    if (fileRef.current) fileRef.current.value = ""; // clear file input
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Gadget name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        type="text"
        placeholder="Color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        type="text"
        placeholder="Capacity"
        value={capacity}
        onChange={(e) => setCapacity(e.target.value)}
        className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <div className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={image.startsWith("data:") ? "" : image}
          onChange={(e) => {
            setImage(e.target.value);
            setPreview(e.target.value);
          }}
          className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <label className="text-sm text-gray-400">or upload an image:</label>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="text-sm text-gray-300 bg-black cursor-pointer"
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-40 object-cover rounded-xl mt-3 border border-white/20"
          />
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 hover:opacity-90 py-2 rounded-lg font-semibold transition"
      >
        {editingGadget ? "Update Gadget" : "Add Gadget"}
      </button>
    </form>
  );
};

export default Form;
