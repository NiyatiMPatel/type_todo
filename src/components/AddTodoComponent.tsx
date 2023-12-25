import React from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { createTodo, readTodos, updateTodo } from "../api/apiHelper";

interface AddTodoComponentProps {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  isEdit: boolean;
  todo: Todo;
  setTodo: React.Dispatch<React.SetStateAction<Todo>>;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  updateId: string;
  setUpdateId: React.Dispatch<React.SetStateAction<string>>;
}

const AddTodoComponent = ({
  setTodos,
  isEdit,
  todo,
  setTodo,
  setIsEdit,
  updateId,
  setUpdateId,
}: AddTodoComponentProps) => {
  // FORMIK INITIAL VALUES
  const initialValues: TodoPayload = {
    task: isEdit && Object.keys(todo).length > 0 ? todo?.task : "",
    status:
      isEdit && Object.keys(todo).length > 0
        ? todo?.status === true
          ? "completed"
          : "pending"
        : "",
  };

  // FORMIK VALIDATION SCHEMA
  const validationSchema = Yup.object({
    task: Yup.string()
      .min(3, "Must be 3 characters or more")
      .required("Task is Required"),
    status: Yup.string()
      .oneOf(
        ["completed", "pending"],
        'Status must be either "completed" or "pending"'
      )
      .required("Status is Required"),
  });

  // HANDLE FORM SUBMISSION
  const handleFormSubmit = async (
    values: TodoPayload,
    { resetForm }: FormikHelpers<TodoPayload>
  ) => {
    const payload: TodoPayload = {
      task: values.task,
      status: values.status === "completed" ? true : false,
    };
    // UPDATE TO DO
    if (isEdit) {
      await updateTodo(updateId, payload);
      setIsEdit(false);
      setUpdateId("");
    } else {
      // ADD TODO
      await createTodo(payload);
    }
    // RELOAD/READ ALL TODOS AFTER UPDATE/CREATE TODO
    const data = await readTodos();
    setTodos(data?.data);
    resetForm();
  };

  // HANDLE FORM CANCELLATION
  const cancelHandler = async () => {
    setIsEdit(false);
    setTodo({} as Todo);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
      enableReinitialize={true}
    >
      {({ isSubmitting, values }) => (
        <Form className="bg-gray-700 shadow-md rounded-lg flex justify-between items-center px-8 pt-6 pb-8 mb-4">
          <div className="user-fields w-3/6 flex justify-between items-center">
            <div className="task-field w-full">
              <label htmlFor="task" className="block text-md font-bold mb-2">
                Task
              </label>
              <Field
                type="text"
                name="task"
                value={values?.task || ""}
                className="w-4/5 border-2 rounded-md border-slate-400 leading-8 text-slate-400 font-medium"
              />
              <ErrorMessage name="task" component="div" />
            </div>
            <div className="status-field w-full">
              <label htmlFor="status" className="block text-md font-bold mb-2">
                Status
              </label>
              <Field
                type="text"
                name="status"
                value={values?.status || ""}
                className="w-4/5 border-2 rounded-md border-slate-400 leading-8 text-slate-400 font-medium"
              />
              <ErrorMessage name="status" component="div" />
            </div>
          </div>
          <div className="user-action-field">
            {!isEdit && (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-9 py-3 bg-orange-500 border-2 border-slate-100 rounded-lg font-bold"
              >
                Submit
              </button>
            )}
            {isEdit && (
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-stone-200 px-9 py-3 border-2 rounded-md border-green-400 text-green-400"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={cancelHandler}
                  className="bg-stone-200 px-9 py-3 border-2 rounded-md border-red-400 text-red-400"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddTodoComponent;
