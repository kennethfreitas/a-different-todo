import { ExpiredTaskDto } from '@core/task';
import { UserService } from '@core/user';
import Container from 'typedi';

const service = Container.get(UserService);

export async function penaltUsers(data: ExpiredTaskDto): Promise<void> {
  const { responsible, email } = data;
  await service.addPenalty({ name: responsible, email });
}
