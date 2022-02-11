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
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const TaskModel = model<Task>('tasks', taskSchema);
