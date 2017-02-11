(function(){
var FLICKR_API_URL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=';
var FLICKR_API_KEY = '9c0b191a1d8415714a70a2a3db4abdeb';


function getPhotosForSearch(word) {

    //var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=9c0b191a1d8415714a70a2a3db4abdeb&text=' + word;
    var url = `${FLICKR_API_URL}${FLICKR_API_KEY}&extras=url_q,url_s&text=${word}`;

    // console.log("flickr url: ", url);

    return (
        fetch(url)
        .then(response => response.json())
        .then(data => data.photos.photo) //will return the array of photos (each photo being objects)
    ); //fetch request working
};

function createFlickrThumb(photoData) {

    // console.log("data sent to linkify: ", photoData);

    var link = document.createElement('a');
    link.setAttribute('href', photoData.url_q);
    link.setAttribute('target', '_blank');

    var image = document.createElement('img');
    image.setAttribute('src', photoData.url_s);
    image.setAttribute('alt', photoData.title);

    link.appendChild(image);

    return link;
}

//=================================WIRING TO THE DOM===============================================
var app = document.querySelector('#app');
var searchForm = app.querySelector('.search-form');
var wordInput = searchForm.querySelector('.search-input');
var getPhotosButton = searchForm.querySelector('.get-photos-button');
var results = app.querySelector('#results'); //by making the results an ID versus CLASS, it's more specific and you're able to refer to it as the parent Node versus classes which are more general.



//eventhandlers
searchForm.addEventListener('submit', function(event) {
    event.preventDefault();

    var word = wordInput.value;

    // console.log("word entered: ", word);
    while (results.hasChildNodes()) {
        results.removeChild(results.lastChild);
    }

    results.innerText = "loading...";

    getPhotosForSearch(word)
        .then(function(response) {
            // console.log("photos: ", response, typeof response);

            results.innerText = "";

            // var link;
            // response.forEach(function(eachPhoto){
            // 	link = createFlickrThumb(eachPhoto);
            // 	app.appendChild(link);
            // })
            var links = response.map(createFlickrThumb);

            links.forEach(function(link) {
                results.appendChild(link);
            });
        });


});
})();
