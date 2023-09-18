import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createTask, deleteTask, updateTask, getTask } from '../api/tasks.api';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export function TaskFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const navigate = useNavigate();
  const params = useParams();
  // console.log(params);

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      // console.log(params.id);
      await updateTask(params.id, data);
      toast.success('Updated task', {
        position: 'bottom-right',
      });
    } else {
      await createTask(data);
      toast.success('Task created', {
        position: 'bottom-right',
      });
    }
    navigate('/tasks');
  });

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const res = await getTask(params.id);
        setValue('title', res.data.title);
        setValue('desciption', res.data.desciption);
      }
    }
    loadTask();
  }, []);

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="title"
          {...register('title', { required: true })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />
        {errors.title && <span>this field is required</span>}
        <textarea
          rows="3"
          placeholder="desciption"
          {...register('desciption', { required: true })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />
        {errors.desciption && <span>this field is required</span>}
        <button className="bg-indigo-500 p-3 rounded-lg block w-full mt-3">Save</button>
      </form>
      {params.id && (
        <div className="flex justify-end">
          <button
            className="bg-red-500 p-3 rounded-lg w-48 mt-3"
            onClick={async () => {
              const accepted = window.confirm('Are you sure?');
              if (accepted) {
                await deleteTask(params.id);
                toast.success('Task deleted', {
                  position: 'bottom-right',
                });
                navigate('/tasks');
              }
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
