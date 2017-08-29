/**
 * Firebase sync service
 */

import * as Firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import config from './config';

export default class Sync {

  private static sync: Sync | null = null;
  private app: Firebase.app.App;
  private db:  Firebase.database.Database;

  private refs = {
    authors: () => '/authors',
    author: (uid: string) => this.refs.authors() + `/${uid}`,
    blogs: () => '/blogs',
    blog: (uid: string) => this.refs.blogs() + `/${uid}`
  };

  private constructor() {
    // Fail if config is missing or incomplete
    if(!config.apiKey ||
      !config.databaseURL ||
      !config.authDomain ||
      !config.projectId
    ) {
      console.log('Unable to configure Firebase');
      return;
    }

    try {
      this.app = Firebase.initializeApp(config);
    } catch(err) {
      // Fix for async page load
      if (err.code === 'app/duplicate-app') {
        this.app = Firebase.app();
      } else {
        console.log(err);
      }
    }
    this.db = Firebase.database();
    console.log('Firebase init done');
  }

  public static getService(): Sync {
    if (!Sync.sync) {
      this.sync = new Sync();
    }

    return Sync.sync as Sync;
  }

  private async readRef<T>(ref: string): Promise<T | null> {
    try {
      const snapshot = await this.db.ref(ref).once('value');
      return (snapshot.val() || null) as T | null;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  private async writeRef<T>(ref: string, val: T): Promise<T> {
    return this.db.ref(ref).set(val).then(() => val);
  }

  public async getBlog(id: string): Promise<Blog | null> {
    return this.readRef<Blog>(this.refs.blog(id));
  }

  public async getBlogs(): Promise<BlogMap | null> {
    return this.readRef<BlogMap>(this.refs.blogs());
  }

  public async setBlog(id: string, blog: Blog): Promise<Blog> {
    return this.writeRef(this.refs.blog(id), blog);
  }

  public async setAuthor(author: {
    uid: string,
    name: string,
    email: string,
    photo: string,
  }) {
    return this.writeRef<Author>(this.refs.author(author.uid), {
      id: author.uid,
      email: author.email,
      name: author.name,
      photo: author.photo,
      bio: '',
      username: '',
    })
  }

  public async login() {
    try {
      console.log(this);

      const result = await Firebase
        .auth()
        .signInWithPopup(new Firebase.auth.GoogleAuthProvider());

      const user = result.user;
      console.log(this);
      this.setAuthor({
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      }).then(user => console.log(user));

    } catch (err) {
      console.log(`Login failed: ${err}`);
    }
  }
}
