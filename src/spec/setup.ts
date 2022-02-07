import 'reflect-metadata';
import Container from 'typedi';

import { TaskRepository } from '@core/task/persistence/TaskRepository';
import { TaskRepositoryMock } from './mocks';

Container.set(TaskRepository, TaskRepositoryMock);
