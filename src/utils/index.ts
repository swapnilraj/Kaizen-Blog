/**
 * Preloaded state
 */

import {
  State,
} from '../stores/root';

import uuid from 'uuid/v4';

export const preloadedState = (): State => ({
  blogs: {
    blogPosts: {},
    loading: false,
    selectedPost: null,
  },
  router: {
    path: '/',
  },
  authors: {
    authors: {},
    loading: false,
    selectedAuthor: null,
  },
  drafts: {
    activeDraft: null,
    drafts: {},
  },
});

export const objectToArray = object => Object.keys(object).map(key => object[key]);

export const newDraft = (): Blog => ({
  authors: [],
  banner: '',
  body: '',
  comments: [],
  createdAt: Date.now(),
  updatedAt: Date.now(),
  salutes: 0,
  slug: '',
  status: 'draft',
  tags: [],
  title: '',
  id: uuid(),
});