export interface EmailConfig {
  smtpServer: string;
  port: string;
  email: string;
  password: string;
  destination: string;
  subject: string;
  content: string;
}

export enum GenerationStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface GeneratedResult {
  code: string;
  explanation?: string;
}
