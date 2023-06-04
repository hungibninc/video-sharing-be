export interface Ishare {
  name: string;
  email: string;
  title: string;
}

export interface ServerToClientEvents {
  share: (e: Ishare) => void;
}

export interface ClientToServerEvents {
  share: (e: Ishare) => void;
}
