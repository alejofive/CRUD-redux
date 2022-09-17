import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux/es/exports";
import { addTask, editTask } from "../features/tasks/taskSlice";
import { v4 as uuid } from "uuid";
import { useNavigate, useParams } from "react-router-dom";

const TaskForm = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const tasks = useSelector((state) => state.tasks);

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSumit = (e) => {
    e.preventDefault();
    if (params.id) {
      dispatch(editTask(task));
    } else {
      dispatch(
        addTask({
          ...task,
          id: uuid(),
        })
      );
    }
    navigate("/");
  };

  useEffect(() => {
    if (params.id) {
      setTask(tasks.find((task) => task.id == params.id));
    }
    console.log(tasks);
  }, [params.id]);

  return (
    <div>
      <form
        action=""
        onSubmit={handleSumit}
        className="bg-zinc-800 max-w-sm p-4 mb-2"
      >
        <label htmlFor="title" className="block text-xs font-bold my-2">
          Title:
        </label>
        <input
          name="title"
          type="text"
          placeholder="Title"
          onChange={handleChange}
          value={task.title}
          className="w-full p-2 rounded-md bg-zinc-600 md-2"
        />
        <label htmlFor="description" className="block text-xs font-bold my-2">
          description:
        </label>
        <textarea
          name="description"
          placeholder="description"
          onChange={handleChange}
          value={task.description}
          className="w-full p-2 rounded-md bg-zinc-600 md-2"
        ></textarea>
        <button className="bg-indigo-600 px-2 py-1">save</button>
      </form>
    </div>
  );
};

export default TaskForm;
