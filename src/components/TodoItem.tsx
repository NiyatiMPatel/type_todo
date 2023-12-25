import { deleteTodo, readTodo, readTodos } from "../api/apiHelper";

interface TodoItemProps {
  id: string;
  task: string;
  status: boolean;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdateId: React.Dispatch<React.SetStateAction<string>>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setTodo: React.Dispatch<React.SetStateAction<Todo>>;
}

const TodoItem = ({
  id,
  task,
  status,
  isEdit,
  setIsEdit,
  setUpdateId,
  setTodos,
  setTodo,
}: TodoItemProps) => {
  // READ SINGLE TODO
  const editHandler = async (id: string) => {
    setIsEdit(true);
    setUpdateId(id);
    const data = await readTodo(id);
    setTodo(data?.data);
  };

  // DELETE TODO
  const deleteHandler = async (id: string) => {
    await deleteTodo(id);
    !!isEdit && setTodo({} as Todo);
    !!isEdit && setIsEdit(false);
    const data = await readTodos();
    setTodos(data?.data);
  };

  return (
    <div className="flex justify-between items-center my-2 py-4 px-8 bg-gray-700 shadow-md rounded-lg">
      <div className="tasks">
        {task} : {status === true ? "Completed" : "Pending"}
      </div>
      <div className="tasks-actions flex gap-4">
        <div className="edit">
          <button
            onClick={() => editHandler(id)}
            className="bg-stone-200 py-2 px-4 border-2 rounded-md border-green-400 text-green-400"
          >
            Edit
          </button>
        </div>
        <div className="delete">
          <button
            onClick={() => deleteHandler(id)}
            className="bg-stone-200 py-2 px-4 border-2 rounded-md border-red-400 text-red-400"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
