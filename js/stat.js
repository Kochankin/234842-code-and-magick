'use strict';

 //поиск рандомного числа
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//координаты полигонов
var shadeCoords = [
  {xInit: 110, yInit:20},
  {x: 310, y: 40},
  {x: 530, y: 20},
  {x: 510, y: 145},
  {x: 530, y: 290},
  {x: 310, y: 260},
  {x: 110, y: 290},
  {x: 130, y: 145}
];

var cloudCoords = [
  {xInit: 100, yInit:10},
  {x: 300, y: 30},
  {x: 520, y: 10},
  {x: 500, y: 135},
  {x: 520, y: 280},
  {x: 300, y: 250},
  {x: 100, y: 280},
  {x: 120, y: 135}
];

function drawPolygon (context, coordinates, fillStyle, strokeStyle){
  context.beginPath();
  context.moveTo(coordinates[0].xInit, coordinates[0].yInit);//1
  for (var i=1; i<coordinates.length-1; i++){
    context.lineTo(coordinates[i].x,coordinates[i].y)
  }
  context.closePath();
  if(fillStyle){
    context.fillStyle = fillStyle;
    context.fill();
  }
  if (strokeStyle){
    context.strokeStyle = strokeStyle;
    context.stroke();
  }
}

//объявление выигрыша
var renderText = {
  font: '16px PT Mono',
  text: ['Ура вы победили!', 'Список результатов:'],
  x: [240, 240],
  y: [45, 65],
  renderInit : function(context){
    context.font = this.font;
    for (var i=0; i<this.text.length; i++){
      context.strokeText(this.text[i], this.x[i], this.y[i])
    }
  }
}

window.renderStatistics = function (ctx, names, times) {
 //рисуем тень и облако
 drawPolygon(ctx,shadeCoords, 'rgba(0, 0, 0, 0.7)');
 drawPolygon(ctx,cloudCoords,'rgb(255, 255, 255)', 'rgb(0, 0, 0)');

  //объявление выигрыша
  renderText.renderInit(ctx);

  //ищем самое большое время
  var maxTime = Math.max.apply(null, times);

  //высчитываем соотношение px и мс
  var columnWidth = 40;
  var histogramHeight = 150;
  var scale = maxTime/histogramHeight;
  scale = scale.toFixed(3);

  //высчитываем высоты всех колонок
  var columnHeights = [];
  for (var i=0; i<times.length; i++){
    times[i] = Math.round(times[i]);
    var height = times[i] /scale;
    columnHeights[i] = Math.round(height);
  }

  //сведения для построения колонок и подписей
  var CANVASHEIGHT = 300;
  var SHIFT = 65;
  var RECTW = 40;
  var rectX = 70;
  var textX = 70;

  // случайное определение цвета колонки
  var columnColors = ['rgba(0, 74, 193, 0.8)', 'rgba(0, 74, 193, 0.6)', 'rgba(0, 74, 193, 0.4)'];

  //строим колонки
  for (var i=0; i<times.length; i++){
    rectX +=90;
    var rectH = columnHeights[i];
    var rectY = CANVASHEIGHT - rectH - SHIFT;
    var random = getRandomInt(0, columnColors.length);
    names[i] === 'Вы' ? (ctx.fillStyle = 'rgba(255, 0, 0, 1)') :ctx.fillStyle = columnColors[random];

    ctx.fillRect(rectX, rectY, RECTW, rectH);
    ctx.font = '13px PT Mono';
    ctx.fillStyle = 'rgb(0, 0, 0)';
    textX +=90;
    ctx.fillText(names[i], textX, 250);
    var textY = 230 - rectH;
    ctx.fillText(Math.round(times[i]), textX, textY);
  }
}






