# instantsearch workshop

*(first held at the [Hackference 2016](https://2016.hackference.co.uk) hackathon in Birmingham, UK)*

At the end of the workshop you'll have used [instantsearch.js](https://community.algolia.com/instantsearch.js) to create a powerful search page for IMDB data. By default,
it will look like this, giving the user the abilty to search by title and facet by genre and rating:

![Example search](https://dl.dropboxusercontent.com/s/wgrg39yh5i4akgb/Screenshot%202016-10-22%2013.14.55.png)

## Setup

Fork this repository. You can also clone it, but if you fork it than you'll have the hassle-free option to deploy to Github pages.

Clone your fork and open the `index.html` page in your editor.

## Workshop

### Act 1

Open the `index.html` page in your browser. You should see basic HTML and a search box but no results. We're going to add the code step by step to get results to display and then we'll add more interactivity with facets.

Add this code to the `search.js` file. This instantiates instantsearch object and configures it with an Algolia `appID`, `apiKey` and `indexName`.

``` javascript
var search = instantsearch({
  appId: 'latency',
  apiKey: '6be0576ff61c053d5f9a3225e2a90f76',
  indexName: 'movies',
  urlSync: {}
});
```

The Algolia app and index contains data that was uploaded in advance of the workshop. To upload your own data to Algolia, first get a [free account](https://www.algolia.com/users/sign_up), then check out the [import documentation](https://www.algolia.com/doc/guides/indexing/import-synchronize-data) to upload data and configure the index. Then, if you'd like to continue the workshop with your own data, just replace `appId`, `apiKey` and `indexName` with your own values.

Next, add this code after the last line. This registers the `input` text box as the search box for our application.

``` javascript
search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#q'
  })
);
```

Next, let's add a widget that will display the results of the search. The `#hits` element is the container that we'll put our results in.

``` javascript
search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    hitsPerPage: 10,
  })
);
```

Add this at the end of the file and save it.

```
search.start();
```

Refresh your browser pointed to `index.html`. You should see now results that will change as you type queries.
The results will be shown as raw JSON until we template them, so let's template them :)

### Act 2

Add these templates above the hits widget declaration:

``` javascript
var hitTemplate =
  '<div class="hit media">' +
    '<div class="media-left">' +
      '<div class="media-object" style="background-image: url(\'{{image}}\');"></div>' +
    '</div>' +
    '<div class="media-body">' +
      '<h4 class="media-heading">{{{_highlightResult.title.value}}} {{#stars}}<span class="ais-star-rating--star{{^.}}__empty{{/.}}"></span>{{/stars}}</h4>' +
      '<p class="year">{{year}}</p><p class="genre">{{#genre}}<span class="badge">{{.}}</span> {{/genre}}</p>' +
    '</div>' +
  '</div>';

var noResultsTemplate =
  '<div class="text-center">No results found matching <strong>{{query}}</strong>.</div>';

```

Next, replace the last `instantsearch.widgets.hits` declaration with this snippet. **Make sure you do not end up with duplicate declarations.**

``` javascript
search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    hitsPerPage: 10,
    templates: {
      empty: noResultsTemplate,
      item: hitTemplate
    },
    transformData: function(hit) {
      hit.stars = [];
      for (var i = 1; i <= 5; ++i) {
        hit.stars.push(i <= hit.rating);
      }
      return hit;
    }
  })
);

```

Refresh your `index.html` page, things should be looking much better now.

### Act 3

Now let's add a few more widgets. These can go right before the `search.start()` call at the end of the file.

First, for pagination.

``` javascript
search.addWidget(
  instantsearch.widgets.pagination({
    container: '#pagination',
    cssClasses: {
      root: 'pagination',
      active: 'active'
    }
  })
);
```

Next, to refine by genre.

``` javascript
search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#genres',
    attributeName: 'genre',
    operator: 'and',
    limit: 10,
    cssClasses: {
      list: 'nav nav-list',
      count: 'badge pull-right',
      active: 'active'
    }
  })
);
```

Next, to use the star rating:

``` javascript
search.addWidget(
  instantsearch.widgets.starRating({
    container: '#ratings',
    attributeName: 'rating',
    cssClasses: {
      list: 'nav',
      count: 'badge pull-right'
    }
  })
);
```

Lastly, to add stats, like the performance of the search.

``` javascript
search.addWidget(
  instantsearch.widgets.stats({
    container: '#stats'
  })
);
```

Save the `search.js` file and reload `index.html`. Search for a few of your favorite movies. Refine results as you please.

Note: this example uses an Algolia index that has already been created and populated. You can also use it with an index of your own, just remember to change the `appId` and `apiKey` above and the templates for displaying information. You will also need to configure faceting for each element field you have added a faceting widget for. You can do this on the `Display/Faceting` tab of the index inside of your Algolia dashboard.

## Host on Github Pages

Just head to the settings for your fork and flip the Github pages source to `master` branch.

![Github settings](https://dl.dropboxusercontent.com/s/c3p1wtu1pir5pwn/Screenshot%202016-10-22%2013.20.53.png)

## Thanks!

Thanks for doing the instantsearch workshop!
