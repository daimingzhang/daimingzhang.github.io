console.log('Loaded font changing bookmarklet!!!');


javascript:(function(){


var v ="2.2.4"; // version of jquery we want to use

if (window.jQuery== undefined || window.jQuery.fn.jquery < v){

    var done = false;
    var script = document.createElement("script");
    script.src="http://ajax.googleapis.com/ajax/libs/jquery/" + v + "/jquery.min.js"; // load version of jQuery we specify
    script.onload = script.onreadystatechange = function(){

        if (!done && (!this.readyState || this.readyState=="loaded" || this.readyState =="complete")){

        done = true;
        initMyBookmarklet(); //If jquery is loaded now run my script

        }
    };
document.getElementsByTagName("head")[0].appendChild(script);


}else{
    initMyBookmarklet();
}

function initMyBookmarklet(){
    (window.myBookmarklet = function (){

        //YOUR CODE GOES HERE!





 $(document).ready(function(){
    $("p").hover(function(){
        $(this).css("background-color", "blue");
        }, function(){
        $(this).css("background-color", "red");

    });
});    
  $(document).ready(function(){
    $("p").hover(function(){
        $(this).css("background-color", "black");
        }, function(){
        $(this).css("background-color", "red");

    });
});    

    $(document).ready(function(){
    $("h1").hover(function(){
        $(this).css("background-color", "yellow");
        }, function(){
        $(this).css("background-color", "black");

    });

}); $(document).ready(function(){
    $("div").hover(function(){
        $(this).css("background-color", "yellow");
        }, function(){
        $(this).css("background-color", "blue");

    });
}); 


   
      

  $(document).ready(function(){
    $("p").click(function(){
        var div = $("p");  
        div.animate({height: 300}, "200");
        div.animate({width: 800}, "800");
        div.queue(function () {
            div.css("background-color", "red");  
            div.dequeue();
        });
        div.animate({height: 400}, "900");
        div.animate({width: 300}, "1100");
    });
});
    $(document).ready(function(){
    $("p").click(function(){
        var div = $("p");  
        div.animate({height: 300}, "100");
        div.animate({width: 300}, "800");
        div.queue(function () {
            div.css("background-color", "blue");  
            div.dequeue();
        });
        div.animate({height: 100}, "1100");
        div.animate({width: 200}, "100");
    });
});

 $(document).ready(function(){
    $("h1").click(function(){
        var div = $("h1");  
        div.animate({height: 700}, "300");
        div.animate({width: 300}, "1100");
        div.queue(function () {
            div.css("background-color", "blue");  
            div.dequeue();
        });
        div.animate({height: 1030}, "4000");
        div.animate({width: 1300}, "2000");
    });
});
 $(document).ready(function(){
    $("h1").click(function(){
        var div = $("h1");  
        div.animate({height: 500}, "300");
        div.animate({width: 300}, "1100");
        div.queue(function () {
            div.css("background-color", "red");  
            div.dequeue();
        });
        div.animate({height: 350}, "100");
        div.animate({width: 100}, "800");
    });
});
 $(document).ready(function(){
    $("p").click(function(){
        $("p").after("<p style='backgroundcolor:red;'>Cyan Magenta Yellow Black</p>");
    });
});
 $(document).ready(function(){
    $("h1").click(function(){
        $("h1").after("<h1 style='backgroundcolor:blue;'>Cyan Magenta Yellow Black</h1>");

    });
});

/*$(document).ready(function(){
    $("p").click(function(){
        $("h1").fadeToggle();
        $("h1").fadeToggle("1100");
        $("h1").fadeToggle(1000);
    });
});
$(document).ready(function(){
    $("h1").click(function(){
        $("p").fadeToggle();
        $("p").fadeToggle("1100");
        $("p").fadein(3000);
    });
});



*//////////








		
 $(document).ready(function(){
    $("input").keydown(function(){
        $("input").css("background-color", "blue");
    });
    $("input").keyup(function(){
        $("input").css("background-color", "red");
    });
});




        //YOUR CODE GOES HERE!
    })();

}

})();
