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

export interface User {
  id: number ;
  email: string;
}

const api = axios.create({
  baseURL: "https://gadget-app-api.onrender.com",
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
  const CLOUD_NAME = "dleley1gv"; 
  const UPLOAD_PRESET = "unsigned_preset"; 
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, 
      formData
    );
    return response.data.secure_url;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw error;
  }
};


//Authentication 

export const loginUser = async (email: string, password: string): Promise<User> => {
  try {
    const response = await api.get("/users", { params: { email, password } });
    const users = response.data
     if (users.length === 0) throw new Error("Invalid credentials");

    return users[0];

  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
}

export const registerUser = async (email : string , password : string ): Promise<User> => {
  try {
    const existing = await api.get("/users" , {params: {email}})
    if (existing.data.length > 0) throw new Error("User already exists");

    const response = await api.post("/users" , {email , password})
    return response.data 
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
} 