interface ExpiredTask {
  taskId: string;
  responsible: string;
  email: string;
}

export interface AlertExpiration {
  alert(expiredTask: ExpiredTask): Promise<void>;
}
