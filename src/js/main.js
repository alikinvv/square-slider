let settings = {};
settings.cols = 20;
settings.rows = 20;
let canvas =jQuery('#canvas')[0];
let context = canvas.getContext('2d');
let toggle1 = jQuery('#image1')[0];
let toggle2 = jQuery('#image2')[0];
let image11 = jQuery('#image1')[0];
let image2 = jQuery('#image2')[0];
let image3 = jQuery('#image3')[0];
let image4 = jQuery('#image4')[0];
let newcanvas = jQuery('<canvas></canvas>')[0];
let newcontext = newcanvas.getContext('2d');
let state = {pos:0};
let xw,xh,delay;
let windowW = $(window).width();
let windowH = $(window).height();

let tl = new TimelineMax();
let tlLoad = new TimelineMax();
let tlText = new TimelineMax();
let scaleFrom = 1.2;

var autoplay = 5000;

tlText.to($('.count, .title, .loc'), 0, {y: '-100%'})
        .to($('.button'), 0, {y: '-200%'})
        .to($('.show .count'), 1, {ease: Power2.easeInOut, y: '0%'})
        .to($('.show .button'), 1, {ease: Power2.easeInOut, y: '0%'}, '-=0.9')
        .to($('.show .title, .show .loc'), 1, {ease: Power2.easeInOut, y: '0%'}, '-=0.8')
        .to($('.show .count, .show .title, .show .loc, .show .button'), 1, {ease: Power2.easeInOut, y: '170%'}, '+=3');

function clamp(min,mid,max){
  return mid < min ? min : mid < max ? mid : max
}
function setCanvasSize(canvas) {
    canvas.width = windowW;
    canvas.height = windowH;    
    $(canvas).css('width', windowW);
    $(canvas).css('height', windowH);
}

setCanvasSize(canvas);
setCanvasSize(newcanvas);

function RenderTempCanvas() {
    newcontext.clearRect(0,0,windowW,windowH);
    newcontext.drawImage(toggle2, 0,0);
    xw = windowW/settings.cols;
    xh = windowH/settings.rows;
    for (var i = 0; i<=settings.cols; i++) {
        for (var j = 0; j<=settings.rows; j++) {
            delay = (j*i)/(settings.cols*settings.rows);
            newcontext.clearRect(i*xw,j*xh,xw*clamp(state.pos -delay,0,1),xh*clamp(state.pos - delay,0,1));
        }
    }
}

function render(imageT) {
    context.clearRect(0,0,windowW,windowH);
    context.drawImage(imageT, 0,0);
    RenderTempCanvas();
    context.drawImage(newcanvas, 0,0);    
}


function draw() {
    render(toggle1);
    window.requestAnimationFrame(draw);
}

draw();
load();

setInterval(function() {
    Toggle()
    load();   
}, autoplay);

function load() {
    tlLoad.to($('.load'), autoplay / 1000, {ease: Power2.easeInOut, width: '100%'})
    .to($('.load'), 0, {width: 0});
}

function Toggle(){

    

    if($('.caption.show').is(':last-child')) {
        $('.caption.show').removeClass('show');
        $('.captions .caption:first-child').addClass('show');
    } else {
        $('.caption.show').removeClass('show').next().addClass('show');
    }
    
    tlText.to($('.count, .title, .loc'), 0, {y: '-100%'})
        .to($('.button'), 0, {y: '-200%'})
        .to($('.show .count'), 1, {ease: Power2.easeInOut, y: '0%'})
        .to($('.show .button'), 1, {ease: Power2.easeInOut, y: '0%'}, '-=0.9')
        .to($('.show .title, .show .loc'), 1, {ease: Power2.easeInOut, y: '0%'}, '-=0.8')
        .to($('.show .count, .show .title, .show .loc, .show .button'), 1, {ease: Power2.easeInOut, y: '170%'}, '+=2.8')

    if(state.pos===2) {
        tl.to(state, 2, {pos: 0, ease: Power1.easeOut});
        //tl.fromTo(canvas, 3, {scale: scaleFrom}, {scale: 1, delay: -1.7,ease: Expo.easeOut} )
        //tl.to(newcanvas, 0, {scale: 1, delay: 1});
    } else{
        tl.to(state, 2, {pos: 2, ease: Power1.easeOut});
        //tl.fromTo(canvas, 3, {scale: scaleFrom}, {scale: 1, delay: -1.7,ease: Expo.easeOut} )
        //tl.to(canvas, 0, {scale: 1, delay: 1});        
    }

    if($('#image2').hasClass('active')) {
        $('#image2').removeClass('active');
        $('#image3').addClass('active');
        toggle1 = image3;
    } else if($('#image3').hasClass('active')) {
        $('#image3').removeClass('active');
        $('#image4').addClass('active');
        toggle2 = image4;
    } else if($('#image4').hasClass('active')) {
        $('#image4').removeClass('active');
        $('#image1').addClass('active');
        toggle1 = image1;
    } else if($('#image1').hasClass('active')) {
        $('#image1').removeClass('active');
        $('#image2').addClass('active');
        toggle2 = image2;
    }
}