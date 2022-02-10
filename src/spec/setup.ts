import 'reflect-metadata';
import Container from 'typedi';

import { TaskRepository } from '@core/task/persistence/TaskRepository';
import { EmailNotify } from '@core/task/integrations/EmailNotify';

import { NotifyTaskMock, TaskRepositoryMock } from './mocks';

Container.set(TaskRepository, TaskRepositoryMock);
Container.set(EmailNotify, NotifyTaskMock);
