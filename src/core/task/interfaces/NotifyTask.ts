export interface NotifyTask {
  alert(email: string): Promise<void>;
}
