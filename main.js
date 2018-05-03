$('.btn').click(function() {
  
    $('.text').text('loading . . .');
    
    $.ajax({
      type:"GET",
      //url:"https://api.otreeba.com/v1/strains",
      //url: "http://www.reddit.com/r/subreddit/new.json?sort=new",
      url: "http://strainapi.evanbusse.com/sPddI1E/strains/search/name/Blue Dream",
      success: function(data) {
        console.log(data)
        $('.text').text(JSON.stringify(data));
      },
    });
    
  });

  reddit.hot('weed').limit(5).fetch(function(res) {
    // res contains JSON parsed response from Reddit
    console.log(res);
  });

  reddit.search("Blue Dream").t('month').limit(1).sort("hot").fetch(function (res){
      console.log(res);
  });