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
  }
});

export const MapToArray = ObjectMap => Object.keys(ObjectMap).map(key => ObjectMap[key]);