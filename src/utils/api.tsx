import axios from "axios";

// 🧱 Define the Gadget type
export interface Gadget {
  id: string; // RESTful API returns string IDs
  name: string;
  data?: {
    color?: string;
    capacity?: string;
    [key: string]: any; // allow flexible keys
  };
}

// ⚙️ Create an Axios instance
const api = axios.create({
  baseURL: "https://api.restful-api.dev",
  headers: {
    "Content-Type": "application/json",
  },
});

// 🧩 Fetch all gadgets
export const getGadgets = async (params?: any): Promise<Gadget[]> => {
  try {
    const response = await api.get("/objects", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching gadgets:", error);
    throw error;
  }
};

// ➕ Add new gadget
export const addGadget = async (gadget: Partial<Gadget>): Promise<Gadget> => {
  try {
    const response = await api.post("/objects", gadget);
    return response.data;
  } catch (error) {
    console.error("Error adding gadget:", error);
    throw error;
  }
};

// 🗑️ Delete gadget
export const deleteGadget = async (id: string): Promise<void> => {
  try {
    await api.delete(`/objects/${id}`);
    console.log(`Gadget with id ${id} deleted successfully`);
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      console.warn(`Gadget with id ${id} not found or cannot be deleted`);
    } else {
      console.error("Error deleting gadget:", error);
    }
  }
};

// ✏️ Update gadget (fixed)
export const updatedGadget = async (
  id: string,
  gadget: Partial<Gadget>
): Promise<Gadget> => {
  try {
    // 1️⃣ Fetch the existing gadget
    const existingResponse = await api.get(`/objects/${id}`);
    const existing = existingResponse.data;

    // 2️⃣ Merge old + new data
    const updatedData = {
      ...existing,
      name: gadget.name ?? existing.name,
      data: {
        ...existing.data,
        ...gadget.data,
      },
    };

    // 3️⃣ Send back the full object
    const response = await api.put(`/objects/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating gadget:", error);
    throw error;
  }
};
