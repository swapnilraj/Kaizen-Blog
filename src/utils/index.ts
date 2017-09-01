/**
 * Preloaded state
 */

import {
  State,
} from '../stores/root';

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
  }
});

export const MapToArray = ObjectMap => Object.keys(ObjectMap).map(key => ObjectMap[key]);