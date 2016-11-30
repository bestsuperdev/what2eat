require('styles/main.less')

/*
	动态设置publicPath，在正式环境运行的时候为绝对路径，如果需要手动指定，可以直接设置
	__webpack_public_path__的值，如  __webpack_public_path__ = '/base/bundles/'

 */
var scripts = document.getElementsByTagName('script')
for (var i = scripts.length - 1; i >= 0; i--) {
	if(scripts[i].src.indexOf('.bundle.js') >= 0){
		var src = scripts[i].getAttribute('src');
		__webpack_public_path__ = src.substr(0, src.lastIndexOf('/') + 1);
		break
	}
}

var ajax = require("../scripts/utils/ajax");
var $btn = document.querySelector('#btn');
$btn.hidden=false;
var $container = document.querySelector('#container');
var $text = document.querySelector('#text');
var $h1 = document.querySelector('h1');
var state = 'stop';
var bghandler = null;
var handler = null;
var foodName;
var foods;       

var date = new Date();
if (date.getHours() >= 20) {
    $h1.innerHTML = '夜宵吃什么呢？'
  }else if(date.getHours() >= 13){
    $h1.innerHTML = '晚上吃什么呢？'
  }else{
    $h1.innerHTML = '中午吃什么呢？'
}

 ajax({
		type:"GET",
		url:"/api/restaurant/list",
		body:"",
		success:function (eve){
				foods = eve;
		}
	}); 
function generateTemp() {
  var $span = document.createElement('span');
  $span.className = 'temp';
  $span.style.top = (Math.floor(Math.random() * window.innerHeight * 0.8)) + 'px';
  $span.style.left = (Math.floor(Math.random() * window.innerWidth * 0.8)) + 'px';
  $span.style.fontSize = Math.floor(Math.random() * (37 - 14) + 14) + 'px';
  $span.style.color = "rgba(0,0,0,." + Math.random() + ")";
  $span.innerHTML = foods[Math.floor(Math.random() * foods.length)].name;
  $container.appendChild($span)
  setTimeout(function () {
    $span.className = $span.className + ' start' 
    setTimeout(function() {
      $container.removeChild($span)
    }, 1000);
  },50)
 } 
function start() {
  if (state === 'run') {
    console.log(2)
    state = 'stop'
    clearTimeout(handler)
    handler = null
    clearInterval(bghandler);
    bghandler = null;

    $btn.innerHTML = '开始';
     if(foods == null){
      	return;
      }
    $text.innerHTML = foods[Math.floor(Math.random() * foods.length)].name+" "+foods[Math.floor(Math.random() * foods.length)].address;
  }else if(state === 'stop'){
    console.log(3)
    state = 'run'
    $btn.innerHTML = '停止';
    var run = function () {
      if (bghandler == null) {
        bghandler = setInterval(generateTemp,50);
      }
      if(foods == null){
      	return;
      }
      $text.innerHTML = foods[Math.floor(Math.random() * foods.length)].name;
      clearTimeout(handler)
      // handler = null
      handler = setTimeout(run, 80);
    }
    run()
  }
}
  	$btn.addEventListener('keyup',function (event) {
      event.stopPropagation()
    },false)
    $btn.addEventListener('click', function (event) {
      event.stopPropagation()
      start()
    } ,false)
    document.addEventListener('keyup',function (event) {
      if (event.which === 13) {
        test = 0
        start()
      }
    },false)