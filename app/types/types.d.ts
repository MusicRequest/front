type User = {
  id: string;
  name: string;
  countVoting: number;
  eventId: string;
  createdAt: string;
  updatedAt: string;
};

type Event = {
  id: string;
  name: string;
  background_image?: string;
  options: object;
  participants: [];
};
