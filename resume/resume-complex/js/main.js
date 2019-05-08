var first = document.getElementById('first'),
    second = document.getElementById('second'),
    third = document.getElementById('third'),
    fourth = document.getElementById('fourth'),
    talkcock = document.getElementById('talkcock'),
    showIntroduction = document.getElementById('showIntroduction'),
    showSkill = document.getElementById('showSkill'),
    showPlus = document.getElementById('showPlus'),
    contactCard = document.getElementById('contactCard');
// 初始化动画类名数组
var animate = ["rubberBand animated","jackInTheBox animated","jello animated","zoomIn animated"];

// 文字悬浮动画
window.onload = function(){
  first.onmouseover=function() {
    //将数组随机排序
    animate.sort(function(){return Math.random()>0.5?-1:1;});
    // console.log(animate);
    //取一个随机数
    var index = Math.floor((Math.random()*animate.length));
    // alert(animate[index]);
    first.setAttribute("class",animate[index]);
  }
  second.onmouseover=function() {
    //将数组随机排序
    animate.sort(function(){return Math.random()>0.5?-1:1;});
    // console.log(animate);
    //取一个随机数
    var index = Math.floor((Math.random()*animate.length));
    // alert(animate[index]);
    second.setAttribute("class",animate[index]);
  }
  third.onmouseover=function() {
    //将数组随机排序
    animate.sort(function(){return Math.random()>0.5?-1:1;});
    // console.log(animate);
    //取一个随机数
    var index = Math.floor((Math.random()*animate.length));
    // alert(animate[index]);
    third.setAttribute("class",animate[index]);
  }
  fourth.onmouseover=function() {
    //将数组随机排序
    animate.sort(function(){return Math.random()>0.5?-1:1;});
    // console.log(animate);
    //取一个随机数
    var index = Math.floor((Math.random()*animate.length));
    // alert(animate[index]);
    fourth.setAttribute("class",animate[index]);
  }
  talkcock.onmouseover=function() {
    //将数组随机排序
    animate.sort(function(){return Math.random()>0.5?-1:1;});
    // console.log(animate);
    //取一个随机数
    var index = Math.floor((Math.random()*animate.length));
    // alert(animate[index]);
    talkcock.setAttribute("class",animate[index]);
  }

}
function donghua() {
  //将数组随机排序
  animate.sort(function(){return Math.random()>0.5?-1:1;});
  // console.log(animate);
  //取一个随机数
  var index = Math.floor((Math.random()*animate.length));
  // alert(animate[index]);
  talkcock.setAttribute("class",animate[index]);
}
function donghuaCard() {
  //将数组随机排序
  animate.sort(function(){return Math.random()>0.5?-1:1;});
  // console.log(animate);
  //取一个随机数
  var index = Math.floor((Math.random()*animate.length));
  // alert(animate[index]);
  contactCard.setAttribute("class",animate[index]);
}
function donghuaShowIntroduction() {
  //将数组随机排序
  animate.sort(function(){return Math.random()>0.5?-1:1;});
  // console.log(animate);
  //取一个随机数
  var index = Math.floor((Math.random()*animate.length));
  // alert(animate[index]);
  showIntroduction.setAttribute("class",animate[index]);
}
function donghuaShowSkill() {
  //将数组随机排序
  animate.sort(function(){return Math.random()>0.5?-1:1;});
  // console.log(animate);
  //取一个随机数
  var index = Math.floor((Math.random()*animate.length));
  // alert(animate[index]);
  showSkill.setAttribute("class",animate[index]);
}
function donghuaShowPlus() {
  //将数组随机排序
  animate.sort(function(){return Math.random()>0.5?-1:1;});
  // console.log(animate);
  //取一个随机数
  var index = Math.floor((Math.random()*animate.length));
  // alert(animate[index]);
  showPlus.setAttribute("class",animate[index]);
}

// 导航栏悬停
var header =  document.getElementsByClassName('header')[0];
window.onscroll = function() {
  // console.log(window.scrollY);
  var scrollTop =  document.body.scrollTop || document.documentElement.scrollTop;
  var clientHeight =  document.body.clientHeight || document.documentElement.clientHeight;
  if (scrollTop >= clientHeight) {
    header.style.position= "fixed";
  }else{
    header.style.position= "absolute";
  }
}
