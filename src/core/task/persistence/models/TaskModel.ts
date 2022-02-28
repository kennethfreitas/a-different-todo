import { model, Schema } from 'mongoose';
import { Task } from '@core/task/interfaces/Task';

const taskSchema = new Schema<Task>(
  {
    id: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    responsible: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    toObject: {
      virtuals: true,
      transform: function (doc, ret) {
        const {_id, __v, ...obj} = ret
        return obj;
      },
    },
  }
);

export const TaskModel = model<Task>('tasks', taskSchema);
