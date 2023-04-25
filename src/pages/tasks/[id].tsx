import { supabase } from "@/lib/supabaseClient";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export const getServerSideProps: GetServerSideProps = async ({
  params,
}: any) => {
  const { data, error }: any = await supabase
    .from("tasks")
    .select("*")
    .eq("id", params.id);

  return {
    props: { task: data?.[0] },
  };
};

export default function Task(props: any) {
  const router = useRouter();
  const { task } = props;

  const [taskData, setTaskData] = useState(task.task);

  const handleUpdate = async () => {
    if (taskData === task.task) return;
    const response: any = await fetch("/api/tasks", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: task.id, task: taskData, completed: false }),
    });
    router.push("/tasks");
  };

  const handleDelete = async () => {
    const response: any = await fetch(`/api/tasks?id=${task.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    router.push("/tasks");
  };

  const handleDone = async () => {
    const response: any = await fetch("/api/tasks", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: task.id, completed: true }),
    });
    router.push("/tasks");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await handleUpdate();
  };

  return (
    <div className={`flex min-h-screen flex-col items-center space-y-10 p-24`}>
      <form onSubmit={handleSubmit}>
        <input
          className="text-white text-center bg-transparent focus:border-0 focus:outline-none text-3xl font-bold appearance-none"
          type="text"
          value={taskData}
          onChange={(e) => setTaskData(e.target.value)}
        />
        <button type="submit" className="hidden">
          submit
        </button>
      </form>
      <div className="flex space-x-4">
        <p
          className={`${
            taskData === task.task
              ? "cursor-not-allowed opacity-60"
              : "cursor-pointer"
          } hover:text-blue-500`}
          onClick={handleUpdate}
        >
          Update
        </p>
        <p className="hover:text-red-500 cursor-pointer" onClick={handleDelete}>
          Delete
        </p>
        <p
          className="hover:text-yellow-500 cursor-pointer"
          onClick={handleDone}
        >
          Done
        </p>
      </div>
      <Link href="/tasks">
        <button className="bg-blue-600 hover:bg-blue-800  py-2 px-4 rounded-md">
          Tasks
        </button>
      </Link>
    </div>
  );
}
