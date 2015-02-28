;var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
	 dataNumbers = [],
 	 dataCells = [],
 	 timer = $('#timer'),
 	 timeCounter, interval, sec, min, rSec, rMin,
 	 timerActive = false;

function buildNumberCells() {
	for (var i = 1; i <= 16; i ++) {
		$('#cell-' + i).html('<div class="game-number-inner"><span id="num-' + numbers[i - 1] + '" data-number="' + numbers[i - 1] +'">' + numbers[i - 1] + '</span></div>');
	};
};

function shuffleNumbers() {
	var arrayLength = numbers.length,
		temporary,
		index;

	while (arrayLength > 0) {
		index = Math.floor(Math.random() * arrayLength);
		arrayLength --;
		temporary = numbers[arrayLength];
		numbers[arrayLength] = numbers[index];
		numbers[index] = temporary;
	} return numbers;
};

function changeCell(cell) {
    var emptyCell = $('#num-16').parent().parent(),
    	clickCellInner = '#cell-' + cell + ' span',
    	clickNumber = $(clickCellInner).data('number'),
    	targetCell = '#cell-' + cell;

    $(clickCellInner).attr('id', 'num-' + clickNumber);
    
    $('#cell-a').append($(clickCellInner));
    $('#cell-b').append($('#num-16'));
    $(targetCell + ' .game-number-inner').append($('#cell-b span'));
    emptyCell.find('.game-number-inner').append($('#cell-a span'));
};

function gameTimer() {
	var timer = $('#timer'),
		startTimeString = '<span>00</span><span id="blink">:</span><span>00</span>';

	if (timerActive == false) {
		smoothTransition(timer, startTimeString);

		sec = min = rSec = rMin = 0;

		interval = setInterval(function () {
			sec ++;

			if (sec == 60) {
				min ++;
				sec = 0;
			};

			rSec = '0' + sec;
			rMin = '0' + min;

			timer.html('<span>' + rMin.slice(- 2) + '</span><span id="blink" class="blink">:</span><span>' + rSec.slice(- 2) + '</span>');

			if (min == 10) {
				setTimeout(stopTimeCounter, 1000);
			};
		}, 1000);

		setTimeout(function() {
			startTimeCounter();
		}, 500);
	};

	timerActive = true;
};

function initTimeCounter() {
	var timer = $('#timer'),
		sec = min = rSec = rMin = 0;

	clearInterval(interval);
	timer.html('<span>' + rMin.slice(- 2) + '</span><span id="blink">:</span><span>00' + '</span>');
};

function startTimeCounter() { 
	timeCounter = setTimeout(initTimeCounter, 600000);
	// timeCounter = setTimeout(initTimeCounter, 3000);
};

function stopTimeCounter() {
	var timer = $('#timer');

	clearInterval(interval);
	clearTimeout(timeCounter);

	$('#blink').removeClass('blink');

	timerActive = true;

	$('#blink').removeClass('blink');

	smoothTransition(timer, '<p>So slow... Click on <b>\'RELOAD\'</b> in the bottom.</p>');

	$('.game-number').addClass('opacity-low cursor-low');
	$('#help span').addClass('attention');

	disableMovable();

	setTimeout(function () {
		$('#game-container').removeClass('no-image');
	}, 200);
};

function gameComplete() {
	var timer = $('#timer');

	clearInterval(interval);

	$('#blink').removeClass('blink');
	$('section').addClass('opacity-low z-index-low');
	$('#game-complete').removeClass('opacity-low z-index-low');

	if (rMin + rSec == '00') {
		$('#game-time span').html('00:00');
	} else {
		$('#game-time span').html(rMin.slice(- 2) + ':' + rSec.slice(- 2));
	};

	timerActive = false;
};

function makeMovable() {
	if ($('#num-16').parent().parent().attr('id') === 'cell-1') {
		$('#cell-2 span, #cell-5 span').addClass('movable').parent().addClass('parent-hover');
	};

	if ($('#num-16').parent().parent().attr('id') === 'cell-2') {
		$('#cell-1 span, #cell-3 span, #cell-6 span').addClass('movable').parent().addClass('parent-hover');
	};

	if ($('#num-16').parent().parent().attr('id') === 'cell-3') {
		$('#cell-2 span, #cell-4 span, #cell-7 span').addClass('movable').parent().addClass('parent-hover');
	};

	if ($('#num-16').parent().parent().attr('id') === 'cell-4') {
		$('#cell-3 span, #cell-8 span').addClass('movable').parent().addClass('parent-hover');
	};

	if ($('#num-16').parent().parent().attr('id') === 'cell-5') {
		$('#cell-1 span, #cell-6 span, #cell-9 span').addClass('movable').parent().addClass('parent-hover');
	};

	if ($('#num-16').parent().parent().attr('id') === 'cell-6') {
		$('#cell-2 span, #cell-5 span, #cell-7 span, #cell-10 span').addClass('movable').parent().addClass('parent-hover');
	};

	if ($('#num-16').parent().parent().attr('id') === 'cell-7') {
		$('#cell-3 span, #cell-6 span, #cell-8 span, #cell-11 span').addClass('movable').parent().addClass('parent-hover');
	};

	if ($('#num-16').parent().parent().attr('id') === 'cell-8') {
		$('#cell-4 span, #cell-7 span, #cell-12 span').addClass('movable').parent().addClass('parent-hover');
	};

	if ($('#num-16').parent().parent().attr('id') === 'cell-9') {
		$('#cell-5 span, #cell-10 span, #cell-13 span').addClass('movable').parent().addClass('parent-hover');
	};

	if ($('#num-16').parent().parent().attr('id') === 'cell-10') {
		$('#cell-6 span, #cell-9 span, #cell-11 span, #cell-14 span').addClass('movable').parent().addClass('parent-hover');
	};

	if ($('#num-16').parent().parent().attr('id') === 'cell-11') {
		$('#cell-7 span, #cell-10 span, #cell-12 span, #cell-15 span').addClass('movable').parent().addClass('parent-hover');
	};

	if ($('#num-16').parent().parent().attr('id') === 'cell-12') {
		$('#cell-8 span, #cell-11 span, #cell-16 span').addClass('movable').parent().addClass('parent-hover');
	};

	if ($('#num-16').parent().parent().attr('id') === 'cell-13') {
		$('#cell-9 span, #cell-14 span').addClass('movable').parent().addClass('parent-hover');
	};

	if ($('#num-16').parent().parent().attr('id') === 'cell-14') {
		$('#cell-10 span, #cell-13 span, #cell-15 span').addClass('movable').parent().addClass('parent-hover');
	};

	if ($('#num-16').parent().parent().attr('id') === 'cell-15') {
		$('#cell-11 span, #cell-14 span, #cell-16 span').addClass('movable').parent().addClass('parent-hover');
	};

	if ($('#num-16').parent().parent().attr('id') === 'cell-16') {
		$('#cell-12 span, #cell-15 span').addClass('movable').parent().addClass('parent-hover');
	};
};

function disableMovable() {
	for (var i = 1; i <= 16; i ++){
		$('#num-' + i).removeClass('movable').parent().removeClass('parent-hover');
	};
};

function smoothTransition(element, markup) {
	var targetElement = element,
		addedMarkup = markup;

	targetElement.addClass('opacity-low');

	setTimeout(function () {
		targetElement.removeClass('opacity-low').html(addedMarkup);
	}, 350);
};

function gameInit() {
	var timer = $('#timer');

	$('#game-container').addClass('no-image');

	shuffleNumbers();
	buildNumberCells();
	makeMovable();

	timerActive = false;

	clearInterval(interval);

	smoothTransition(timer, '<p>Click on the cells near the empty...</p>');

	$('.game-number').removeClass('empty-cell');
	$('#game-complete').addClass('opacity-low z-index-low');
	$('section').removeClass('opacity-low z-index-low');
	$('.game-number').removeClass('opacity-low cursor-low');
	$('#help span').removeClass('attention');
	$('#num-16').parent().parent().addClass('empty-cell');
	$('.movable').parent().parent().addClass('target-cell');
};

$(document).ready(function() {
	gameInit();

	$(document).on('click', '.movable', function() {
		gameTimer();

		var numberHolder = $(this).parent();

		$('.game-number').removeClass('empty-cell');

		changeCell($(this).parent().parent().data('cell'));
		disableMovable();
		makeMovable();

		smoothTransition(numberHolder);

		$('#num-16').parent().parent().addClass('empty-cell');

		for (var i = 1; i <= 16; i ++) {
			dataCells[i - 1] = $('#cell-' + i).data('cell');
			dataNumbers[i - 1] = $('#cell-' + i + ' span').data('number');
		};

		for (var i = dataCells.length; i --;) {
			if(dataCells[i] !== dataNumbers[i]) return false;
		} return gameComplete();
	});

	$('#game-reload, #help span').on('click', function() {
		gameInit();
	});
});