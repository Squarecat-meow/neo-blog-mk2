export interface IReaction {
  '+1': number;
  '-1': number;
  laugh: number;
  confused: number;
  heart: number;
  hooray: number;
  rocket: number;
  eyes: number;
}

export interface IReactionData {
  id: string;
  reaction: string;
  count: number;
}

export interface IReactionRes {
  reaction: string;
  count: number;
  isActive: boolean;
}

export const reactionArray = [
  {
    reaction: '+1',
    emoji: '👍',
  },
  {
    reaction: '-1',
    emoji: '👎',
  },
  {
    reaction: 'laugh',
    emoji: '😄',
  },
  {
    reaction: 'confused',
    emoji: '😕',
  },
  {
    reaction: 'heart',
    emoji: '❤️',
  },
  {
    reaction: 'hooray',
    emoji: '🎉',
  },
  {
    reaction: 'rocket',
    emoji: '🚀',
  },
  {
    reaction: 'eyes',
    emoji: '👀',
  },
];
