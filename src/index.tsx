console.log('foo');

import Sync from './sync/Sync';

Sync.getService().getBlogs().then(l => console.log(l));