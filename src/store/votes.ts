import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserName = string;
type TeamName = string;
type MatchName = string;

export type Vote = {
  [key in MatchName]: TeamName;
};

export interface UserVote {
  user: UserName;
  vote: Vote;
}

interface VotesState {
  votes: UserVote[];
  addVote(user: UserName, vote: Vote): void;
  deleteAllVotes(): void;
}

export const useVotesStore = create<VotesState>()(
  persist(
    (set, get) => ({
      votes: [],
      addVote: (user, vote) => {
        const existingVote = get().votes.find((v) => v.user === user);
        if (existingVote) throw Error("User already voted");
        const name = user.trim().replace(/\s/g, "");
        if (!name || !name.length || name.length < 3) {
          throw Error("Invalid user name");
        }
        console.log({ user, vote });
        set({ votes: [...get().votes, { user, vote }] });
      },
      deleteAllVotes: () => {
        set({ votes: [] });
      },
    }),
    {
      name: "vote-storage",
    }
  )
);
