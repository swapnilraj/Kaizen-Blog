import Sync from './sync/Firebase';

const sync = Sync.getService();

const button = document.getElementById('login') as HTMLElement;
button.addEventListener('click', sync.login);

sync.getBlogs().then(l => console.log(l));