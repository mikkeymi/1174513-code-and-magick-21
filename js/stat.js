'use strict';

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const CLOUD_GAP = 10;
const COLUMNS_GAP = 50;
const COLUMN_WIDTH = 40;
const BOTTOM_GAP = 30;
const MAX_BAR_HEIGHT = CLOUD_HEIGHT / 2;
const Y_START_POSITION = CLOUD_Y + CLOUD_HEIGHT;

const renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000000';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', 130, 30);
  ctx.fillText('Список результатов:', 130, 50);
};


window.renderStatistics = function (ctx, names, times) {
  renderCloud(
      ctx,
      CLOUD_X + CLOUD_GAP,
      CLOUD_Y + CLOUD_GAP,
      'rgba(0, 0, 0, 0.7)'
  );
  renderCloud(
      ctx,
      CLOUD_X,
      CLOUD_Y,
      '#fff'
  );

  let maxTime = Math.max.apply(null, times);

  for (var i = 0; i < names.length; i++) {

    // вычисляем высоту стобца взависимости от очков
    let barHeight = (MAX_BAR_HEIGHT * times[i]) / maxTime;

    // вычисляем стартовую точку для оси Х
    let xStartPosition = CLOUD_X + COLUMN_WIDTH + (COLUMN_WIDTH + COLUMNS_GAP) * i;

    // рисуем имя
    ctx.fillStyle = '#242424';
    ctx.fillText(
        names[i],
        xStartPosition,
        Y_START_POSITION - BOTTOM_GAP
    );

    // рисуем очки над столбцом
    ctx.fillText(
        times[i].toFixed(), // округляем не круглые очки
        xStartPosition,
        Y_START_POSITION - BOTTOM_GAP - barHeight - BOTTOM_GAP
    );

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      let scoreSaturation = Math.random() * (100 - 10) + 10;
      ctx.fillStyle = 'hsl(227, ' + scoreSaturation + '%, 50%)';
    }


    // рисуем столбец
    ctx.fillRect(
        xStartPosition,
        Y_START_POSITION - BOTTOM_GAP * 1.3,
        COLUMN_WIDTH,
        -barHeight
    );
  }
};
