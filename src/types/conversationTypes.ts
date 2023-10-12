export type Message =
  | {
      originBot: false;
      text: string;
    }
  | (AnswerFromChatbot & {
      originBot: true;
    });

export type Conversation = {
  created_at: string;
  messages: Message[];
};

export type Source = {
  isin: string;
  shortname: string;
  link: string;
  page: number;
};

export type AnswerFromChatbot = {
  text: string;
  sources: Source[];
};

export type MessageBubbleProps = Message & {
  error?: boolean;
};
