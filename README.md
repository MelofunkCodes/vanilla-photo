Referencing Project #2 from: https://github.com/DecodeMTL/vanilla-js-projects

DETAILS:


## Project #2: Flickr API Photo Browser
It's your turn now! Based on what you learned while doing the previous project, you will build a Flickr Photo Browser! Here's an example of what a super basic version of the browser will look. If you want to use this as part of your portfolio, you should definitely follow some of the improvements that we suggest ;)

<p align="center">
  <img src="flickr-api-project.gif">
</p>

1. Get an API key [here](https://www.flickr.com/services/api/misc.api_keys.html). You'll have to get a Yahoo account... (yes, we know). For this app, you only need the key and not the secret.

  ![Flickr API Key](flickr-api-key.png)

2. Read the documentation for the [Flickr Search API](https://www.flickr.com/services/api/flickr.photos.search.html). Even though it mentions XML results, you can get JSON back by using this URL format:

  ```
  https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=YOUR_API_KEY&text=THE_SEARCH_TEXT
  ```

3. Read the documentation on [how to build URLs for Flickr images](https://www.flickr.com/services/api/misc.urls.html)

4. Write a function called `getPhotosForSearch` that takes a search term and returns an array of photo objects. You'll have to transform the Flickr response quite a bit. Ideally you will return an array of objects, with each object having `thumb`, `large`  and `title` properties. These properties should be URLs built using the documentation in step 3.
5. Wire up a search form submit event to start the search using the word(s) in the form input. When receiving the results, clear a pre-existing container div and put the results in there. Each result should have this shape:

  ```html
  <a href="URL OF THE LARGE IMAGE" target="_blank">
    <img src="URL OF THE THUMBNAIL" alt="TITLE OF THE IMAGE">
  </a>
  ```

  In order to create such elements, it would help to have a helper function called `createFlickrThumb` that returns an `<a>` element, like this:

  ```javascript
  function createFlickrThumb(photoData) {
    var link = document.createElement('a');
    link.setAttribute('href', photoData.large);
    link.setAttribute('target', '_blank');

    var image = document.createElement('img');
    image.setAttribute('src', photoData.thumb);
    image.setAttribute('alt', photoData.title);

    link.appendChild(image);

    return link;
  }
  ```

6. Once the basics are working, it's time to add some improvements!!
  * Make the gallery look nice with CSS
  * Make the gallery responsive using a block grid
  * Instead of linking to each image, prevent the click and display a popup image with an X
  * Infinite scroll! Using `window.addEventListener('scroll')`, try to figure out when the scrolling has reached the bottom of the page, and start loading the next page of results.