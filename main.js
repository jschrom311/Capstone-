'use strict'

$("form").submit(function(event){
  event.preventDefault();
  $('.description').addClass('searching')
  let query = $("input").val()
  //console.log(query);
  getRedditData(query);
});


//$('.btn').click(function() {
function getStrainData(query){  
    $('.text').text('loading . . .');
    
    $.ajax({
      type:"GET",
      url: `http://www.reddit.com/r/subreddit/new.json?sort=new`,
      success: function(data) {
        //console.log(data)
        getRedditData(query);
        $('.text').text(JSON.stringify(data));
      },
    });
  };

function getRedditData(query){
  let allWords = [ ]  
    let promise = searchControversial(query)
    let promise2 = searchHot(query)
    let promise3 = searchNew(query)
    let promise4 = searchTop(query)
  Promise.all([promise, promise2, promise3, promise4]).then((W) => {
    var merged = [].concat.apply([], W);
    //console.log("allWords", merged, W);
    window.allWords = allWords
    //displayWords(merged)
    countValues(merged)
  })
 
}

function countValues(merged){
  let data = [ ]
  let match = false
  for (let n=0; n<merged.length; n++){
    console.log(merged[n])
    for (let q=0; q<data.length; q++){
      if (data[q].word === merged[n]){
        //then "value" +1
        data[q].value++
        match = true
        break
      }
    }
    if (!match){
      data.push({word:merged[n],value:0})
    }
    match = false 
  }    
  console.log(data)
  var my_color = d3.scale.category20();
  window.makeWordCloud(data, "#mySVG", 500, "my_svg", "Impact", true, my_color)
}

function displayWords(merged){
  let html = ' '
  for (let k=0; k<merged.length; k++){
    html += `<li>${merged[k]}</li>`
  }
  $('.search-results').html(`<ul>${html}</ul>`)
}


function searchControversial(query){
  return new Promise ((resolve) => {
    reddit.controversial(query).t('month').limit(20).fetch(function(res){
      handleError(res.data)
    let children = res.data.children
    let words = [ ]
    for (let j=0; j<children.length;j++){
      let title = children[j].data.title
      words = words.concat(title.split(" ").filter(word => word.length > 3 && word != query))
      //console.log(words);
      //return words;
      //allWords = [...allWords,...words]
    }
    resolve(words);
  })
  })
}

function searchHot(query){
  return new Promise ((resolve) => {
    reddit.search(query).t('month').limit(20).sort("hot").fetch(function(res){
      handleError(res.data)
    let children = res.data.children
    let words = [ ]
    for (let j=0; j<children.length;j++){
      let title = children[j].data.title
      words = words.concat(title.split(" ").filter(word => word.length > 3 && word != query))
      //console.log(words);
      //return words;
      //allWords = [...allWords,...words]
    }
    resolve(words);
  })
  })
}


function searchNew(query){
  return new Promise ((resolve) => {
    reddit.new(query).limit(20).fetch(function(res){
      handleError(res.data)
    let children = res.data.children
    let words = [ ]
    for (let j=0; j<children.length;j++){
      let title = children[j].data.title
      words = words.concat(title.split(" ").filter(word => word.length > 3 && word != query))
      //console.log(words);
      //return words;
      //allWords = [...allWords,...words]
    }
    resolve(words);
  })
  })
}

function handleError(data) {
  if (!data){
    alert("No data found")
    return
  }
}

function searchTop(query){
  return new Promise ((resolve) => {
    reddit.top(query).t('all').limit(20).fetch(function(res){
      handleError(res.data)
    let children = res.data.children
    let words = [ ]
    for (let j=0; j<children.length;j++){
      let title = children[j].data.title
      words = words.concat(title.split(" ").filter(word => word.length > 3 && word != query))
      //console.log(words);
      //return words;
      //allWords = [...allWords,...words]
    }
    resolve(words);
  })
  })
}
$().ready(function(){
$('button').click(()=>{
  $('.description.card.container').addClass('flip')
  console.log(this);
})


$('.test').click((e)=>{
  console.log(this, $(this).text,e,e.currentTarget.innerHTML)
})

// Don't forget to load dom. Otherwise, makeWordCloud function might fails to work.


  // Make sure the format => [ {"word": String, "value": Number}, ..., ... ]
  // Value should be greater than 0
  let data = [
      {"word": "田中", "value": 3}, 
      {"word": "太郎", "value": 13}, 
      {"word": "西尾", "value": 8},
      {"word": "維新", "value": 80},
      {"word": "完全", "value": 18},
      {"word": "無血", "value": 2},
      {"word": "開城", "value": 6},
      {"word": "極悪", "value": 2},
      {"word": "戦隊", "value": 1},
      {"word": "田中", "value": 3}, 
      {"word": "太郎", "value": 13}, 
      {"word": "西尾", "value": 8},
      {"word": "維新", "value": 80},
      {"word": "完全", "value": 18},
      {"word": "無血", "value": 2},
      {"word": "開城", "value": 6},
      {"word": "極悪", "value": 2},
      {"word": "戦隊", "value": 1},
      {"word": "田中", "value": 3}, 
      {"word": "太郎", "value": 13}, 
      {"word": "西尾", "value": 8},
      {"word": "維新", "value": 80},
      {"word": "完全", "value": 18},
      {"word": "無血", "value": 2},
      {"word": "開城", "value": 6},
      {"word": "極悪", "value": 2},
      {"word": "戦隊", "value": 1},
  ]
  
  // you can use own color converting function if you want
  //var my_color = d3.scale.category20();

  // makeWordCloud(data, css selector that you wanna insert in, scale of svg, class name of svg, font-family, rotate or not, your color converting function)
  //window.makeWordCloud(data, "body", 500, "my_svg", "Impact", true, my_color)

  // [ svg class, font-family, rotate words or not, color function ] are optional.
  // the simplest way => window.makeWordCloud(data, "body", 500)

})