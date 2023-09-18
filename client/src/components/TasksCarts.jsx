import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getTask } from '../api/tasks.api';

export function TasksCarts({ task, id }) {
  const navigate = useNavigate();
  const { register, setValue } = useForm();

  useEffect(() => {
    async function loadTask() {
      if (task) {
        const res = await getTask(id);
        const ress = setValue('check', res.data.done);
        console.log(ress);
      }
    }
    loadTask();
  }, []);

  return (
    <div>
      <div
        className="bg-zinc-800 p-3 hover:bg-zinc-700 hover:cursor-pointer"
        onClick={() => {
          navigate(`/tasks/${task.id}`);
        }}
      >
        <h1 className="font-bold uppercase">{task.title}</h1>
        <p className="text-slate-400">{task.desciption}</p>
      </div>

      <div className="flex justify-center rounded-sm bg-opacity-20 bg-gray-400 border border-gray-500 p-1">
        <input
          id="default-checkbox"
          type="checkbox"
          value=""
          {...register('check', { required: false })}
          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Default checkbox
        </label>
      </div>
    </div>
  );
}
