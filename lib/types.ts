export type User = {
  id: string;
  name: string;
  countVoting: number;
  eventId: string;
  createdAt: string;
  updatedAt: string;
};

export type Event = {
  id: string;
  name: string;
  background_image?: string;
  options: object;
  participants: [];
};

export type Visitor = {
  id: string;
  name: string;
  isNotAllowed: boolean;
};
