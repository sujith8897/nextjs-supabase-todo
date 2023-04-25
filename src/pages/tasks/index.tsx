import { supabase } from "./../../lib/supabaseClient";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";

export const getServerSideProps: GetServerSideProps = async ({
  params,
}: any) => {
  const res = await supabase.from("tasks").select();

  return {
    props: {
      tasks: res.data,
    },
  };
};

export default function Tasks(props: any) {
  const [tasks, setTasks] = useState(props.tasks || []);
  const [taskData, setTaskData] = useState("");

  const fetchTasks = async () => {
    const res: any = await fetch("/api/tasks", { method: "GET" });
    const data = await res.json();
    console.log({ data });
    setTasks(data || []);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response: any = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: false, task: taskData }),
    });
    setTaskData("");
    await fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className={`flex min-h-screen flex-col items-center space-y-10 p-24`}>
      <h1 className="text-3xl font-bold">Tasks</h1>
      <ul>
        {tasks?.map((taskItem: any) => (
          <Link href={`/tasks/${taskItem.id}`} key={taskItem.id}>
            <li
              className={`${
                taskItem.completed ? "line-through" : ""
              } bg-blue-100 hover:bg-blue-300 text-gray-900 hover:text-blue-900 cursor-pointer font-bold w-[300px] text-center px-2 py-2 my-4 rounded`}
            >
              {taskItem.task}
            </li>
          </Link>
        ))}
      </ul>
      <div>
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <input
            className="text-gray-900 font-bold text-lg px-3 py-1 rounded"
            type="search"
            placeholder="Enter your task"
            required
            value={taskData}
            onChange={(e) => setTaskData(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-800  py-2 px-4 rounded-md"
          >
            Add Task
          </button>
        </form>
      </div>
      <Link href="/">
        <button className="bg-blue-600 hover:bg-blue-800  py-2 px-4 rounded-md">
          Back
        </button>
      </Link>
    </div>
  );
}
