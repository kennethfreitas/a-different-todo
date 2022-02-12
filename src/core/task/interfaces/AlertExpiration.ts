export interface AlertExpiration {
  alert(taskId: string, responsible: string, email: string): Promise<void>;
}
