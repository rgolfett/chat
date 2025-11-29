export interface Message {
  username: string;
  content: string;
  timestamp: number;
}


export function createMessage(username: string, content: string): Message {
  return {
    username,
    content,
    timestamp: Date.now(),
  };
}