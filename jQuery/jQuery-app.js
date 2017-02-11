(function() {
    var FLICKR_API_URL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=';
    var FLICKR_API_KEY = '9c0b191a1d8415714a70a2a3db4abdeb';


    function getPhotosForSearch(word) {
       //var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=9c0b191a1d8415714a70a2a3db4abdeb&text=' + word;
        var url = `${FLICKR_API_URL}${FLICKR_API_KEY}&extras=url_q,url_s&text=${word}`;

        return (
            $.getJSON(url)
            .then(data => data.photos.photo) //will return the array of photos (each photo being objects)
        ); //fetch request working
    };

    function createFlickrThumb(photoData) {

        var link = $('<a>');
        link.attr({
            href: photoData.url_q,
            target: '_blank'
        });

        var image = $('<img>');
        image.attr({
            src: photoData.url_s,
            alt: photoData.title
        });

        link.append(image);

        return link;
    }

    //=================================WIRING TO THE DOM===============================================
    var app = $('#app');
    var searchForm = app.find('.search-form');
    var wordInput = searchForm.find('.search-input');
    var getPhotosButton = searchForm.find('.get-photos-button');
    var results = app.find('#results'); //by making the results an ID versus CLASS, it's more specific and you're able to refer to it as the parent Node versus classes which are more general.

    $(document).ready(function() {
        //eventhandlers
        searchForm.on('submit', function(event) {
            event.preventDefault();
            var word = wordInput.val();

            if (results.length === 0) {
                results.text('You need to enter a word to get photos. Try again!')
            } 
            else {
                console.log("word entered: ", word);
                if (results.children()) {
                    results.empty();
                }

                results.text("loading...");

                getPhotosForSearch(word)
                    .then(function(response) {
                        results.text("");

                        var links = response.map(createFlickrThumb);

                        links.forEach(function(link) {
                            results.append(link);
                        });
                    });
            }

        });
    })
})();
