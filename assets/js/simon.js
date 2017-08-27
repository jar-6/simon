

$(document).ready(function(){
  var colorArr=["green","red","yellow","blue"];
var hisArr=[];
var myArr=[];
var j=0;var k=0;
var longId;
var testId;
var test2Id;
var isStart=false;
var isStrict=false;
var isWrong="beforeWrong";

function reset(){
  hisArr=[];
  myArr=[];
  j=0;k=0;
  isWrong="beforeWrong";
  $(".count-text").text(0);
  $("#strict").css("background-color","rgb(255,255,0)")
}

function getHisArr(){
  for(var i=0;i<20;i++){
    hisArr.push(Math.floor(Math.random()*4))
  }
  console.log(hisArr);
}

function once(val){
  var audio=document.getElementById('voice'+val);
  if(audio!==null){
  audio.play();}
  $("#light"+val).fadeTo(250,1).fadeTo(250,0);
}

function shortLoop(num){
  var hisArrShort=[];
  hisArrShort=hisArr.slice(0,num+1);  
  var i=0;
  shortId=self.setInterval(
    function(){
    once(hisArrShort[i]);
    i++
  },
  2000
  );
}


function test(){
  var time2=3000*k+6800;
  if (hisArr.slice(0,k).toString()===myArr.toString()||(myArr.length===0&&k===0)){
    console.log('right','k'+k,'time2'+time2,'his'+hisArr.slice(0,k).toString(),'my'+myArr.toString());
    if (isWrong==="afterWrong"){
      console.log("afterWrong",k);
      $('.count-text').css('color','white');
      longLoop();
      isWrong="beforeWrong";
    }
    k++;
  } 
  else{
    var audio=document.getElementById('voice-wrong');
    audio.play();
    $('.count-text').css('color','red');
    if(audio!==null){
      if(!isStrict){
        console.log('wrong','k'+k,'time2'+time2,'his'+hisArr.slice(0,k).toString(),'my'+myArr.toString());
        clearTimeout(longId);
        shortLoop(k-1);
        isWrong="afterWrong";
      }
      else{
        console.log("end");
        isStart=false;
      }
    }
  }
  testId=self.setTimeout(function(){test()},time2);
  myArr=[];
  if(!isStart){
    clearTimeout(longId);
    clearTimeout(testId);
    reset();
    $("#start").css("background-color","rgb(200,10,0)")
  }
}
function longLoop(){
  shortLoop(j);
  var time=3000*j+7000;
    longId=self.setTimeout(
    function(){
      longLoop();
    },time);
  j++;
  console.log('longLoop','time'+time,hisArr.slice(0,j))
  $(".count-text").text(j);//n
}
  reset();
  $(".off-on").click(function(){
    if($(".off-on-inner").css('left')==='2px'){
      $(".off-on-inner").css('left','17px');
      clearTimeout(longId);
      clearTimeout(testId);
      reset();
    }
    else{$(".off-on-inner").css('left','2px')}
  })   
  $(".quarter").click(function(){ 
    var myClick=this.id[this.id.length-1];
    once(myClick);
    myArr.push(myClick);
  })
  $("#start").click(function(){
    isStart=!isStart;
    console.log('isStart',isStart);
    if(isStart){
      $("#start").css("background-color","rgb(255,30,30)")
      j=0;
      getHisArr();
      longLoop();
      test();
    }
    else{
      $("#start").css("background-color","rgb(200,10,0)")
      clearTimeout(longId);
      clearTimeout(testId);
      reset();
    }
  })
  $("#strict").click(function(){
    isStrict=true;
    console.log('isStrict',isStrict);
    $("#strict").css("background-color","rgb(255,255,150)")
  })
  })