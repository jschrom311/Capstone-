'use strict'

//This is the input search form
$("form").submit(function (event) {
  event.preventDefault();
  $('.description').addClass('searching')
  let query = $("input").val()
  getRedditData(query);
});

function getStrainData(query) {
  $('.text').text('loading . . .');

  $.ajax({
    type: "GET",
    url: `http://www.reddit.com/r/subreddit/new.json?sort=new`,
    success: function (data) {
      getRedditData(query);
      $('.text').text(JSON.stringify(data));
    },
  });
};

function getRedditData(query) {
  let allWords = []
  cloudLoading(true)
  let promise2 = searchHot(query)
  let promise4 = searchTop(query)
  Promise.all([promise2, promise4]).then((W) => {
    var merged = [].concat.apply([], W);
    window.allWords = allWords
    countValues(merged)
  })

}

//This function applies key value pairs to the words stripped from Reddit titles
function countValues(merged) {
  let data = []
  let match = false
  for (let n = 0; n < merged.length; n++) {
    console.log(merged[n])
    for (let q = 0; q < data.length; q++) {
      if (data[q].word === merged[n]) {
        data[q].value++
          match = true
        break
      }
    }
    if (!match) {
      data.push({
        word: merged[n],
        value: 0
      })
    }
    match = false
  }
  console.log(data)
  var my_color = d3.scale.category20();
  window.makeWordCloud(data, "#mySVG", 500, "my_svg", "Impact", true, my_color)
}

//This function shows a cloud loading gif while the Reddit word cloud is being generated
function cloudLoading(x) {
  if (x) {
    $('#mySVG').append('<img class="loading" src="https://cdn.dribbble.com/users/73104/screenshots/2832940/cloud_load.gif">')
  } else {
    $('.loading').remove()
  }
}

function displayWords(merged) {
  let html = ' '
  for (let k = 0; k < merged.length; k++) {
    html += `<li>${merged[k]}</li>`
  }
  $('.search-results').html(`<ul>${html}</ul>`)
}

//This function searches through Reddit's 'Hot' section.  It will grab words from Reddit titles related to the user selected topic and set a count to each one found.
function searchHot(query) {
  return new Promise((resolve) => {
    reddit.search(query).t('month').limit(20).sort("hot").fetch(function (res) {
      handleError(res.data)
      let children = res.data.children
      let words = []
      for (let j = 0; j < children.length; j++) {
        let title = children[j].data.title
        words = words.concat(title.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ").split(" ").filter(word => word.length > 3 && word != query))
      }
      resolve(words);
    })
  })
}

//In the case that there is no data for a specific term this will handle the error
function handleError(data) {
  if (!data) {
    return
  }
}

//This function searches through Reddit's 'Top' section.  It will grab words from Reddit titles related to the user selected topic and set a count to each found.
function searchTop(query) {
  return new Promise((resolve) => {
    reddit.top(query).t('all').limit(20).fetch(function (res) {
      handleError(res.data)
      let children = res.data.children
      let words = []
      for (let j = 0; j < children.length; j++) {
        let title = children[j].data.title
        words = words.concat(title.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ").split(" ").filter(word => word.length > 3 && word != query))
      }
      resolve(words);
    })
  })
}

//This flips the card on the landing page to allow the user to input their desired topic
$().ready(function () {
  $('button').click(() => {
    $('.description.card.container').addClass('flip')
    console.log(this);
  })

//This enables the user to click on a word within the word cloud
  $('.test').click((e) => {
    console.log(this, $(this).text, e, e.currentTarget.innerHTML)
  })

  //Below is the d3 word cloud imported data structure
  let data = [{
      "word": "田中",
      "value": 3
    },
    {
      "word": "太郎",
      "value": 13
    },
    {
      "word": "西尾",
      "value": 8
    },
    {
      "word": "維新",
      "value": 80
    },
    {
      "word": "完全",
      "value": 18
    },
    {
      "word": "無血",
      "value": 2
    },
    {
      "word": "開城",
      "value": 6
    },
    {
      "word": "極悪",
      "value": 2
    },
    {
      "word": "戦隊",
      "value": 1
    },
    {
      "word": "田中",
      "value": 3
    },
    {
      "word": "太郎",
      "value": 13
    },
    {
      "word": "西尾",
      "value": 8
    },
    {
      "word": "維新",
      "value": 80
    },
    {
      "word": "完全",
      "value": 18
    },
    {
      "word": "無血",
      "value": 2
    },
    {
      "word": "開城",
      "value": 6
    },
    {
      "word": "極悪",
      "value": 2
    },
    {
      "word": "戦隊",
      "value": 1
    },
    {
      "word": "田中",
      "value": 3
    },
    {
      "word": "太郎",
      "value": 13
    },
    {
      "word": "西尾",
      "value": 8
    },
    {
      "word": "維新",
      "value": 80
    },
    {
      "word": "完全",
      "value": 18
    },
    {
      "word": "無血",
      "value": 2
    },
    {
      "word": "開城",
      "value": 6
    },
    {
      "word": "極悪",
      "value": 2
    },
    {
      "word": "戦隊",
      "value": 1
    },
  ]

  // you can use own color converting function if you want
  //var my_color = d3.scale.category20();

  // makeWordCloud(data, css selector that you wanna insert in, scale of svg, class name of svg, font-family, rotate or not, your color converting function)
  //window.makeWordCloud(data, "body", 500, "my_svg", "Impact", true, my_color)

  // [ svg class, font-family, rotate words or not, color function ] are optional.
  // the simplest way => window.makeWordCloud(data, "body", 500)

})