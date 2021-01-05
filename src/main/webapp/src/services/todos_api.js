const BASE_URL = 'http://localhost:8080/todos';

const TodosAPI = function () { };

TodosAPI.parseResponse = async function (response) {
  const body = await response.text();
  const json = JSON.parse(body.replace(/"id":(-?\d+),/g, '"id":"$1",'));

  return json;
};

TodosAPI.getAll = async function () {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  const response = await fetch(BASE_URL, requestOptions);
  return TodosAPI.parseResponse(response);
}

TodosAPI.create = async function (title) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ "title": title }),
    redirect: 'follow'
  };

  const response = await fetch(BASE_URL, requestOptions);
  return TodosAPI.parseResponse(response);
}

TodosAPI.updateTodo = async function (todo) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const { id, ...data } = todo;
  const payload = Object.fromEntries( //
    Object.entries(data).filter(([_, v]) => v != null) //
  );

  const requestOptions = {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify(payload),
    redirect: 'follow'
  };

  const response = await fetch(`${BASE_URL}/${todo.id}`, requestOptions);
  return TodosAPI.parseResponse(response);
}

TodosAPI.delete = async function (id) {
  const requestOptions = {
    method: 'DELETE'
  };

  const response = await fetch(`${BASE_URL}/${id}`, requestOptions);

  return response.status;
}

export default TodosAPI;