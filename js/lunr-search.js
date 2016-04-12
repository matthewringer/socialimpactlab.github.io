---
---
require([
  '{{site.baseurl}}/js/jquery.js',
  '{{site.baseurl}}/js/mustache.js',
  '{{site.baseurl}}/js/lunr.js',
  'text!{{site.baseurl}}/content/result-view.mustache',
  'text!{{site.baseurl}}/content/result-list.mustache',
  'text!{{site.baseurl}}/content/search-docs.json',
  'text!{{site.baseurl}}/content/search-index.json'
], function (_, Mustache, lunr, questionView, questionList, data, indexDump) {

  var index = lunr(function () {
    this.field('title', {boost: 10})
    this.field('body')
    this.field('tags')
    this.field('categories')
    this.ref('id') 
  });

  var renderQuestionList = function (qs) {
    $("#results-list-container")
      .empty()
      .append(Mustache.to_html(questionList, {results: qs}))
  }

  var renderQuestionView = function (question) {
    $("#results-view-container")
      .empty()
      .append(Mustache.to_html(questionView, question))
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

  var rawDocs = JSON.parse(indexDump)
  
  var addDocs = function(index, docs){
    for(var i = 0; i < docs.length; i++){
        index.add({ id: docs[i].id,
                    title: docs[i].title,
                    categories: docs[i].categories,
                    tags: docs[i].tags, 
                    url: docs[i].url }); }
  };
  
  console.time('load')
  addDocs(index, rawDocs.pages);
  window.idx = addDocs(index, rawDocs.posts); 
  console.timeEnd('load')

  var posts = JSON.parse(data).posts.map(function (raw) {
    return {
      id: raw.id,
      title: raw.title,
      categories: raw.categories,
      tags: raw.tags,
      url: raw.url
    }
  })
  
  var pages = JSON.parse(data).pages.map(function (raw) {
    return {
      id: raw.id,
      title: raw.title,
      categories: raw.categories,
      tags: raw.tags,
      url: raw.url
    }});
  
  var questions = posts.concat( pages ).filter(function (q ){ return q.id !== "NaN";});

  renderQuestionList(questions)
  
  //renderQuestionView(questions[0])

  $('a.all').bind('click', function () {
    renderQuestionList(questions)
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

  $('input').bind('keyup', debounce(function () {
    if ($(this).val() < 2) return
    var query = $(this).val()
    var results = index.search(query)
    
     results = results.map(function (result) {
      return questions.filter(function (q) { return q.id === parseInt(result.ref, 10) })[0]
    })

    renderQuestionList(results)
  }))

//   $("#results-list-container").delegate('li', 'click', function () {
//     var li = $(this)
//     var id = li.data('question-id')

//     renderQuestionView(questions.filter(function (question) {
//       return (question.id == id)
//     })[0])
//   })

})