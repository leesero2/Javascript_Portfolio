var words = ["the","of","and","to","in","you","for","or","it","as","be","on","with","can","have","this","by","not","but","at","from","they","more"
         ,"will","if","some","there","what","about","which","when","one","all","also",
         "him","her","hello","java","script","project","juice","math","tree","cloth","key","board","mouse","paper","bot","dry",
         "book","mac","com","naver","cup","top","good","excel","nice","gang","bro","sis","bag","pad","arm","nose","hair","head","leg",
         "sharp","pen","hold","hole","open","close","pin","ear","eye","mouth","clock","peak","tear","drop","rain","bow","pair","team",
         "candy","rice","food","meat","pork","fruit","gum","meal","fast","go","zig","zag","super","dad","mom","uncle","grand"] //100

var a = '#' //단어
var x = 0;
var score = 0;
var k = 0;
var p = 0;    //랜덤으로 단어 생성 변수
var speed = 0;
var level = 0;

// $(function(){   //함수 생성
//   $('div').hide();  // hide로 div 테그부분을 숨김
// });

alert("게임을 시작합니다.") 

setTimeout(function(){      //특정 시간이 되면 특정함수를 자동 실행하는 코드
   wrodsmake(); //해당 함수를 실행
},100) //이 시간이 흘러야 함수를 실행

function wrodsmake(){
setInterval(function(){
   x++;
   a = '#' + x;
   if(x == 10)
      x = 0;
   p = Math.floor(Math.random() * 11) //0~10
   
   if(p <= 4)
   {
      gogo();    //떨어지는거
      $(function(){
        var base = $(a);
        base.addClass('gogos');
      });
   }
  else if(p <= 6) //
   {
     zig();   //지그재그
     $(function(){
       var base = $(a);
       base.addClass('zigs');
     });

  }
   else if(p <= 6) //빠르게 떨어지는거
   {
      fast();
      $(function(){
        var base = $(a);
        base.addClass('fasts');
      });

   }
   else if(p <= 8) //10
   {
      sudden();   //갑자기 생성되는거
      $(function(){
        var base = $(a);
        base.addClass('suddens');
      });
   }
},2000);    //단어가 생성되는 속도
}

function displayKeyCode(itag)
{
    if(event.keyCode == 13) // 13은 엔터
    {
       var t = document.getElementById("txtfield"); // txtfield 라는 id를 가진 테그를 선택한다

       for(var i=1;i<=10;i++)
       {
          var b = '';
          b = ''+i;
          var n = document.getElementById(b);
          if(t.value == n.innerHTML)
          {
             b = '#'+i;


                $(function(){
             $(b).html("");
            });

                $(function(){
                   score+=50;
             $("#score").html(score + (level*1100));
            });
             if(score >= 1100)
             {
                if(level >= 3)
                {
                   alert("클리어 하셨습니다.")
                   alert("이 난이도로 계속 진행됩니다.")
                }
                else
                {
                   score = 0;
                   level++;
                   speed+=1000;
                   alert((level+1) + "단계에 진입합니다.")
                }
             }
          }
       }
       $(itag).val("");
    }
}

function gogo(){
   var go = x;
   $(function(){
       $(a).html(words[Math.floor(Math.random()*100)]);
   });
   $(function(){
        $(a).animate({
           left:Math.floor(Math.random()*300) //랜덤함수로 해당위치를 지정
          },1,
          function(){
             $(a).show();
          });
      });

      $(function(){
         $(a).animate({
            top:700
         },7000-speed);
      });

      $(function(){
         $(a).hide({
         });
      });

      $(function(){
         $(a).animate({
            left:0
         },1,
         function(){
         var gog = '#'+go;
         var id2 = $(gog);
         id2.removeClass('gogos');
         });
      });
      $(function(){
         $(a).animate({
            top:0
         },1);
      });
}

//사라지는 함수
function sudden(){
   var go = x;
   $(function(){
       $(a).html(words[Math.floor(Math.random()*100)]);
   });
   $(function(){
        $(a).animate({
           left:Math.floor(Math.random()*1000),top:300
          },1,function(){
             $(a).show();
          });
      });

      $(function(){
         $(a).animate({
            top:700
         },4000-speed);
      });

      $(function(){
         $(a).hide({
         });
      });
      $(function(){
         $(a).animate({
            left:0
         },1,
         function(){
         var gog = '#'+go;
         var id2 = $(gog);
         id2.removeClass('suddens');
         });
      });
      $(function(){
         $(a).animate({
            top:0
         },1);

      });
}

function fast(){
   var go = x;
   $(function(){
       $(a).html(words[Math.floor(Math.random()*100)]);
   });
   $(function(){
        $(a).animate({
           left:Math.floor(Math.random()*1000)
          },1,function(){
             $(a).show();
          });
      });

      $(function(){
         $(a).animate({
            top:700
         },7000-2000-speed);
      });

      $(function(){
         $(a).hide({
         });
      });
      $(function(){
         $(a).animate({
            left:0
         },1);
      });
      $(function(){
         $(a).animate({
            top:0
         },1,
         function(){
         var gog = '#'+go;
         var id2 = $(gog);
         id2.removeClass('fasts');
         });
      });
}

function zig(){
   var go = x;
   $(function(){
       $(a).html(words[Math.floor(Math.random()*100)]);
   });
   $(function(){
      k = Math.floor(Math.random()*500)
        $(a).animate({
           left:k
          },1,function(){
             $(a).show();
          });
      });

      $(function(){
         $(a).animate({
            top:350,left:k+200
         },3500-speed/2);
      });
      $(function(){
         $(a).animate({
            top:700,left:k
         },3500-speed/2);
      });

      $(function(){
         $(a).hide({
         });
      });

      $(function(){
         $(a).animate({
            left:0
         },1,
         function(){
         var gog = '#'+go;
         var id2 = $(gog);
         id2.removeClass('zigs');
         });
      });
      $(function(){
         $(a).animate({
            top:0
         },1);
      });
}

