import axios, { AxiosResponse } from "axios";

const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;

// POST TODO
export const createTodo = async (
  payload: TodoPayload
): Promise<ApiSingleDataType> => {
  try {
    const data: AxiosResponse<ApiSingleDataType> = await axios.post(
      baseUrl,
      payload
    );
    // console.log("file: apiHelper.ts:10 ~ createTodo ~ data:", data);
    const todo: ApiSingleDataType = data?.data;
    return todo;
  } catch (error) {
    console.log("file: apiHelper.js:10 ~ createTodo ~ error:", error);
    throw error;
  }
};

// GET ALL TODOS
export const readTodos = async (): Promise<ApiDataType> => {
  try {
    const data: AxiosResponse<ApiDataType> = await axios.get(baseUrl);
    // console.log("file: apiHelper.ts:11 ~ readTodos ~ data:", data);
    const todos: ApiDataType = data?.data;
    return todos;
  } catch (error) {
    console.log("file: apiHelper.js:22 ~ readTodos ~ error:", error);
    throw error;
  }
};

// GET SINGLE TODO
export const readTodo = async (id: string): Promise<ApiSingleDataType> => {
  try {
    const data: AxiosResponse<ApiSingleDataType> = await axios.get(
      `${baseUrl}/${id}`
    );
    // console.log("file: apiHelper.ts:24 ~ readTodo ~ data:", data);
    const todo: ApiSingleDataType = data?.data;
    return todo;
  } catch (error) {
    console.log("file: apiHelper.js:33 ~ readTodo ~ error:", error);
    throw error;
  }
};

// UPDATE SINGLE TODO
export const updateTodo = async (
  id: string,
  payload: TodoPayload
): Promise<ApiSingleDataType> => {
  try {
    const data: AxiosResponse<ApiSingleDataType> = await axios.put(
      `${baseUrl}/${id}`,
      payload
    );
    const todo: ApiSingleDataType = data?.data;
    // console.log("file: apiHelper.ts:59 ~ updateTodo ~ data:", todo);
    return todo;
  } catch (error) {
    console.log("file: apiHelper.js:44 ~ updateTodo ~ error:", error);
    throw error;
  }
};

// DELETE SINGLE TODO
export const deleteTodo = async (id: string): Promise<ApiSingleDataType> => {
  try {
    const data: AxiosResponse<ApiSingleDataType> = await axios.delete(
      `${baseUrl}/${id}`
    );
    // console.log("file: apiHelper.ts:75 ~ deleteTodo ~ data:", data);
    const todo: ApiSingleDataType = data?.data;
    return todo;
  } catch (error) {
    console.log("file: apiHelper.js:55 ~ deleteTodo ~ error:", error);
    throw error;
  }
};
