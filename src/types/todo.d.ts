type Todo = {
  _id: string;
  status: boolean;
  task: string;
  __v: number;
};

type ApiDataType = {
  data: Todo[];
  message: string;
};
type ApiSingleDataType = {
  data: Todo;
  message: string;
};

type TodoPayload = {
  task: string;
  status: boolean | string;
};
