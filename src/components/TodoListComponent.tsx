import TodoItem from "./TodoItem";

interface TodoListComponentProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdateId: React.Dispatch<React.SetStateAction<string>>;
  setTodo: React.Dispatch<React.SetStateAction<Todo>>;
}

const TodoListComponent = ({
  todos,
  isEdit,
  setIsEdit,
  setUpdateId,
  setTodos,
  setTodo,
}: TodoListComponentProps) => {
  return (
    <>
      {todos?.map((todo) => (
        <TodoItem
          key={todo?._id}
          id={todo?._id}
          task={todo?.task}
          status={todo?.status}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          setUpdateId={setUpdateId}
          setTodos={setTodos}
          setTodo={setTodo}
        />
      ))}
    </>
  );
};

export default TodoListComponent;
