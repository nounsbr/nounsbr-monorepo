import axios from 'axios';
import * as R from 'ramda';
import config from '../src/config';
import { bigNumbersEqual } from './utils';

export interface NormalizedVote {
  proposalId: number;
  supportDetailed: number;
}

export interface Seed {
  background: number;
  body: number;
  accessory: number;
  head: number;
  glasses: number;
}

export interface NormalizedNounBR {
  id: number;
  owner: string;
  delegatedTo: null | string;
  votes: NormalizedVote[];
  seed: Seed;
}

const nounsbrGql = `
{
  nounBRs {
    id
    owner {
      id
	    delegate {
		    id
	    }
    }
    votes {
      proposal {
        id
      }
      supportDetailed
    }
    seed {
      background
      body
      accessory
      head
      glasses
    }
  }
}
`;

export const normalizeVote = (vote: any): NormalizedVote => ({
  proposalId: Number(vote.proposal.id),
  supportDetailed: Number(vote.supportDetailed),
});

export const normalizeSeed = (seed: any): Seed => ({
  background: Number(seed.background),
  body: Number(seed.body),
  glasses: Number(seed.glasses),
  accessory: Number(seed.accessory),
  head: Number(seed.head),
});

export const normalizeNounBR = (nounBR: any): NormalizedNounBR => ({
  id: Number(nounBR.id),
  owner: nounBR.owner.id,
  delegatedTo: nounBR.owner.delegate?.id,
  votes: normalizeVotes(nounBR.votes),
  seed: normalizeSeed(nounBR.seed),
});

export const normalizeNounsBR = R.map(normalizeNounBR);

export const normalizeVotes = R.map(normalizeVote);

export const ownerFilterFactory = (address: string) =>
  R.filter((nounBR: any) => bigNumbersEqual(address, nounBR.owner));

export const isNounBROwner = (address: string, nounBRs: NormalizedNounBR[]) =>
  ownerFilterFactory(address)(nounBRs).length > 0;

export const delegateFilterFactory = (address: string) =>
  R.filter((nounBR: any) => nounBR.delegatedTo && bigNumbersEqual(address, nounBR.delegatedTo));

export const isNounBRDelegate = (address: string, nounBRs: NormalizedNounBR[]) =>
  delegateFilterFactory(address)(nounBRs).length > 0;

export const nounsbrQuery = async () =>
  normalizeNounsBR(
    (await axios.post(config.app.subgraphApiUri, { query: nounsbrGql })).data.data.nounBRs,
  );
