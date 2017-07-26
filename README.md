# Fronto Connect

Toolset for helping connecting to remote data sources like a restful api.

### Videos
[Intro Part 1 (11:06)](https://www.codemy.net/posts/react-intro-to-frontojs-part-1) | [Intro Part 2 (8:03)](https://www.codemy.net/posts/react-intro-to-frontojs-part-2) | [Writing Custom Scopes (6:45)](https://www.codemy.net/posts/react-writing-custom-fronto-connect-scopes)

## Basic Usage

Create a store class and that `extends` from connect.

``` js
import { Connect } from 'fronto-connect'

class Posts extends Connect { 
  namespace = 'api/v1';
  resource = 'posts';
}
```

Once you create your class you will need to mix it with some scopes as well.

### Scopes

Scopes are basic instance level functions that will tell connect how to process responses from your server. Fronto Connect comes with some basic scopes you can use, however feel free to create your own scopes. Here is an example of a scope.

``` js
const readable = {
  find() { this.findBy(); },
  findBy(parameters) {
    this.setIsLoading(true);
    this.clearSelected();
    this.call({ parameters, type: 'get' }, {
      200: this.setSelected
    });
  },
  findAll(parameters) {
    this.setIsLoading(true);
    this.clearCollection();
    this.call({ parameters, type: 'get' }, {
      200: this.setCollection 
    });
  },
}

export default { readable };
```

To use this set of scope on our `Post` class we can use the mixer tool, like so.

``` js
import { Connect, mix } from 'fronto-connect'
import scopes from './scopes'

class Posts extends Connect {
// ... 
}

mix(Posts, scopes.readable)

export default Posts
```

Our class is now complete and we can use it in our app. Lets try it out!

``` js
import Posts from './Posts'
import api from 'fronto-api';

const endpoint = api({
  endpoint: 'http://example.com',
  header: (h) => {
    const token = localStorage.getItem('token')
    h.append('Authorization', token);
  }
})

const posts = new Posts(endpoint);

posts.findAll(); 
// this will make a call to GET http://example.com/api/v1/posts and call 
// the #index action of the posts_controller and populate the posts.collection 
// with the data from the endpoint. Obviously it depends on how you implement
// your endpoint.
```

Once we make the call to the network we can use the `collection` to iterate and render out each post.

``` js
render() {
  const { collection, isLoading } = this.props.posts;

  if (isLoading) { return 'Loading...'; }

  return (
    <div>
      {collection.map(post => 
        <div key={post.id}>
          <h1>
            <a href={posts.route({ id: post.slug })}>{post.title}</a>
          </h1>
        </div>
      )}
    </div>
  )
}
```

### URL Generation

You'll notice that we are using the `posts.route({ id: post.slug })` this will generate the route for our post object like so `/posts/whatever-the-slug-happens-to-be`

You'll also notice that in the `posts.findAll` function we can pass in parameters, we can use parameters to generate url for us, here are some examples.

``` js
posts.findAll({ channel_id: channel.slug });
// will call http://example.com/api/v1/channels/the-slug-of-the-channel/posts 

posts.findAll({ search: true, channel_id: channel.slug });
// will call http://example.com/api/v1/search/channels/the-slug-of-the-channel/posts
```

Sometimes you want the url to be query parameter you can modify your `findAll` function like so.

``` js
findAll(parameters) {
  this.setIsLoading(true);
  this.clearCollection();
  this.call({ parameters, type: 'get', query: true }, {
    200: this.setCollection 
  });
}
```

We added the `query: true` option to the `this.call` what this will do is the following.

``` js
posts.findAll({ search: true, channel_id: channel.slug });
// will call http://example.com/api/v1/posts/search/channels/slug-of-the-channel
```

This concept applies to `findBy` as well.

You can also use `posts.source({ id: post.slug })` will return the full source path like so `/api/v1/posts/slug-of-the-post`

### Callbacks

If you are planning on building your own scopes you will need to understand the callback structure.

``` js
this.call({ parameters, type: 'get', query: true }, {
  200: this.setCollection 
});
```
That is the part that makes the network call. the `200` refers to the status from the server, so if your server responds with `200` it will call that callback, you can specify your own callback. It will give you a response json object. So you can write your own.

``` js
this.call({ parameters, type: 'get', query: true }, {
  200: (response) => this.setCollection(response.data),
  422: (response) => this.handleError(response.error) 
});
```

## TODO

- [ ] Add some tests
- [ ] Convert to TypeScript?
- [x] Documentation on basic usage
- [x] Documentation on url generation
- [ ] More documentation on `this.call`
- [ ] Add Documentation on error handling
- [ ] Documentation on pagination




