---
---
require([
  '{{site.baseurl}}/js/jquery.js',
  '{{site.baseurl}}/js/mustache.js',
  '{{site.baseurl}}/js/lunr.js',
  'text!{{site.baseurl}}/content/result-list.mustache',
  'text!{{site.baseurl}}/content/result-dropdown.mustache',
  'text!{{site.baseurl}}/content/search-docs.json',
  'text!{{site.baseurl}}/content/search-index.json'
], function (_, Mustache, lunr, questionList, quetionDropDown, doc_data, index_data) {

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

  var index = lunr(function () {
    this.field('title', {boost: 10})
    this.field('body')
    this.field('tags')
    this.field('categories')
    this.field('exerpt')
    this.ref('id') 
  });

  var renderQuestionList = function (qs) {
    
    $("#results-list-container")
      .empty()
      .append(Mustache.to_html(questionList, {results: qs}))
      
    $("#results-dropdown-container")
      .empty()
      .append(Mustache.to_html(quetionDropDown, {results: qs}))
  }

  // var renderQuestionView = function (question) {
  //   $("#results-view-container")
  //     .empty()
  //     .append(Mustache.to_html(questionView, question))
  // }

  var search = function(query){
    var results = index.search(query)
     return results.map(function (result) {
      return results_data.filter(function (q) { return q.id === parseInt(result.ref, 10) })[0]
    });
  }
  
  window.profile = function (term) {
    console.profile('search')
    idx.search(term)
    console.profileEnd('search')
  }

  window.search = function (term) {
    console.time('search')
    idx.search(term)
    console.timeEnd('search')
  }

  var rawDocs = JSON.parse(index_data)
  
  var addDocs = function(index, docs){
    for(var i = 0; i < docs.length; i++){
        index.add({ id: docs[i].id,
                    title: docs[i].title,
                    categories: docs[i].categories,
                    tags: docs[i].tags, 
                    exerpt: docs[i].exerpt,
                    url: docs[i].url }); }
  };
  
  console.time('load')
  addDocs(index, rawDocs.pages);
  window.idx = addDocs(index, rawDocs.posts); 
  console.timeEnd('load')

  var posts = JSON.parse(doc_data).posts.map(function (raw) {
    return {
      id: raw.id,
      title: raw.title,
      links: raw.links,
      excerpt: raw.excerpt,
      url: raw.url,
      icon: "fa-feed"
    }
  })
  
  var pages = JSON.parse(doc_data).pages.map(function (raw) {
    return {
      id: raw.id,
      title: raw.title,
      links: raw.links,
      excerpt: raw.excerpt,
      url: raw.url,
      icon: "fa-university" //todo hook in other icons
    }});
  
  var results_data = posts.concat( pages ).filter(function (q ){ return q.id !== "NaN";});


  //page load events
  var q =  getParameterByName("q");
  if(q){
    $('#search-box').val(q)
    renderQuestionList(search(q))
  } else {
    renderQuestionList(results_data)
  }
  
  //TODO: this binding it too general....
  $('a.all').bind('click', function () {
    renderQuestionList(results_data)
    $('input').val('')
  })

  var debounce = function (fn) {
    var timeout
    return function () {
      var args = Array.prototype.slice.call(arguments),
          ctx = this

      clearTimeout(timeout)
      timeout = setTimeout(function () {
        fn.apply(ctx, args)
      }, 100)
    }
  }
  
  $('#search-box').bind('keyup', debounce(function () {
    var query = $(this).val()
    if($("#results-list-container").length === 1){
      renderQuestionList(search(query));
    } else if( query.length > 2 ){
      renderQuestionList(search(query));
      $("#results-dropdown-container").show();
    } else {    
      $("#results-dropdown-container").hide();
    }
  }))
  
  var hoverDropDown = false;
  
//   $('#search-box').keydown(debounce(function(e){
//       if(e.which == 40){
//         $("#results-dropdown-container").focus();
//       }
//   }))
  
  $('#search-box').mouseleave(debounce(function(){
      if(!hoverDropDown){
        $("#results-dropdown-container").hide();
      }
  }))
  
  $('#results-dropdown-container').mouseenter(function(){
      hoverDropDown = true;
  })
  
  $('#results-dropdown-container').mouseleave(function(){
      hoverDropDown = false;
      $('#results-dropdown-container').hide();
  })
})