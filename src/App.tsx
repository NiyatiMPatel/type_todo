import AddTodoComponent from "./components/AddTodoComponent";
import "./App.css";
import TodoListComponent from "./components/TodoListComponent";
import { useEffect, useState } from "react";
import { readTodos } from "./api/apiHelper";
const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<Todo>({} as Todo);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [updateId, setUpdateId] = useState<string>("");

  useEffect(() => {
    // Fetch todos on mount or when isMounted changes
    const fetchTodos = async () => {
      const data = await readTodos();
      setTodos(data?.data);
    };
    fetchTodos();
  }, []);
  // console.log("file: App.tsx:8 ~ App ~ todos:", todos);

  return (
    <div className="w-[1200px] bg-gray-800 p-10 my-5 rounded-xl">
      <h1 className="text-center pb-6">To-Do Application</h1>
      <AddTodoComponent
        setTodos={setTodos}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        todo={todo}
        setTodo={setTodo}
        updateId={updateId}
        setUpdateId={setUpdateId}
      />
      <TodoListComponent
        todos={todos}
        setTodos={setTodos}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        setUpdateId={setUpdateId}
        setTodo={setTodo}
      />
    </div>
  );
};

export default App;
