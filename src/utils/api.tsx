import axios from "axios";

export interface Gadget {
  id: string;
  name: string;
  data?: {
    color?: string;
    capacity?: string;
  };
  image?: string;
}

const api = axios.create({
  baseURL: "http://localhost:5001",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getGadgets = async (params?: any): Promise<Gadget[]> => {
  try {
    const response = await api.get("/gadgets", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching gadgets:", error);
    throw error;
  }
};

export const addGadget = async (gadget: Partial<Gadget>): Promise<Gadget> => {
  try {
    const response = await api.post("/gadgets", gadget);
    return response.data;
  } catch (error) {
    console.error("Error adding gadget:", error);
    throw error;
  }
};

export const deleteGadget = async (id: string): Promise<void> => {
  try {
    await api.delete(`/gadgets/${id}`);
    console.log(`Gadget with id ${id} deleted successfully`);
  } catch (error: any) {
    console.error("Error deleting gadget:", error);
  }
};

export const updatedGadget = async (
  id: string,
  gadget: Partial<Gadget>
): Promise<Gadget> => {
  try {
    const response = await api.put(`/gadgets/${id}`, gadget);
    return response.data;
  } catch (error) {
    console.error("Error updating gadget:", error);
    throw error;
  }
};


export const uploadImageToCloudinary = async (file: File): Promise<string> => {
    const CLOUD_NAME = "dleley1gv"; // Replace with your Cloudinary cloud name
    const UPLOAD_PRESET = "unsigned_preset"; // Replace with your Cloudinary upload preset
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET); // Replace with your Cloudinary upload preset

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, // Replace with your Cloudinary cloud name
      formData
    );
    return response.data.secure_url;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw error;
  }
}