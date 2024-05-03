"use server";

export const addNewProduct = async () => {
  try {
    
    return { success: "Product added to Cart" };
  } catch (error) {
    return { error: "Oops! something went wrong!" };
  }
};
