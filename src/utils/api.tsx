import axios from "axios";
export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
}
const api = axios.create({
    baseURL:"https://api.restful-api.dev",
    headers: {
        "Content-Type": "application/json"
    }
    
})


export const getUsers = async (params? : any ) : Promise<User[]> => {
    try {
        const response = await api.get("/objects", {params});
        return response.data;
    }
    catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
} 


export const  addUser = async (user : Partial<User>) : Promise<User> => {
    try {
        const response = await api.post("/objects", user)
        return response.data;
    }catch (error) {
        console.error("Error adding user:", error);
        throw error;
    }
}


export const deleteUser = async (id: number | string): Promise<void> => {
  try {
    await api.delete(`/objects/${id}`);
    console.log(`User with id ${id} deleted successfully`);
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      console.warn(`User with id ${id} not found or cannot be deleted`);
    } else {
      console.error("Error deleting user:", error);
    }
  }
};


export const updateUser = async (id: number | string, user: Partial<User>): Promise<User> => {
  try {
    const response = await api.put(`/objects/${id}`, user);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}