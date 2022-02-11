import 'reflect-metadata';
import Container from 'typedi';

import { TaskRepository } from '@core/task/persistence/TaskRepository';
import { EmailNotify } from '@core/task/integrations/EmailNotify';
import { UserRepository } from '@core/user/persistence/UserRepository';

import { NotifyTaskMock, TaskRepositoryMock, UserRepositoryMock } from './mocks';

Container.set(TaskRepository, TaskRepositoryMock);
Container.set(EmailNotify, NotifyTaskMock);
Container.set(UserRepository, UserRepositoryMock);
