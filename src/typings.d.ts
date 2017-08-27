/**
 * Custom app config
 */
declare let process: {
  env: {
    // Firebase API Key
    FIREBASE_KEY: string;
    // Firebase Database URL
    FIREBASE_DB: string;
    // Firebase Auth Domain
    FIREBASE_AUTH_DOMAIN: string;
    // Firebase Project ID
    FIREBASE_PROJECT_ID: string;
  }
}

interface Blog {
  title: string;
  createdAt: number;
  updatedAt: number;
  status: 'published' | 'draft';
  body: string;
  authors: string[];
  comments: never[];
  salutes: number;
}

interface BlogMap {
  [id: string]: Blog;
}

interface Author {
  name: string;
  email: string;
  bio: string;
}

interface AuthorMap {
  [id: string]: Author;
}

interface FirebaseSchema {
  blogs: BlogMap;
  authors: AuthorMap;
}