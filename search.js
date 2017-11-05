// workshop code goes in here :)
var search = instantsearch({
  appId: 'latency',
  apiKey: '0e5d8dce55757ee9b0d8bafadd2ec1ed',
  indexName: 'movies',
  urlSync: {}
});

search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#q'
  })
);

search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    hitsPerPage: 10,
  })
);

search.start();
