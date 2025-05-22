export type TMessageType = 'text' | 'file';

export interface IMessage {
  id: number;
  userId: number;
  username: string;
  type: TMessageType;
  content?: string;     
  fileName?: string;   
  mimeType?: string;  
  filePath?: string;  
  createdAt: string; 
}