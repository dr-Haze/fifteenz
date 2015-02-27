;var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
	 dataNumbers = [],
 	 dataCells = [],
 	 interval, sec, min, rSec, rMin,
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

function gameTimer() {
	var timer = $('#timer');

	if (timerActive === false) {
		timer.html('<span>00</span><span id="blink" class="blink">:</span><span>00</span>');

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
		}, 1000);

		setTimeout(function () {
			clearInterval(interval);
			timer.html('<span>' + rMin.slice(- 2) + '</span><span id="blink" class="blink">:</span><span>00' + '</span>');
		}, 1800000);
	};

	timerActive = true;
};

function gameComplete() {
	clearInterval(interval);

	$('#blink').removeClass('blink');

	$('section').css({
		'opacity': '0',
		'zIndex': '0'
	});

	$('#game-complete').css({
		'opacity': '100',
		'z-index': '100'
	});

	if (rMin + rSec == '00') {
		$('#game-time span').html('00:00');
	} else {
		$('#game-time span').html(rMin.slice(- 2) + ':' + rSec.slice(- 2));
	};

	timerActive = false;
};

function gameInit() {
	shuffleNumbers();

	buildNumberCells();

	makeMovable();
}

$(document).ready(function() {
	gameInit();

	$(document).on('click', '.movable', function() {
		gameTimer();

		changeCell($(this).parent().parent().data('cell'));

		disableMovable();
		
		makeMovable();

		for (var i = 1; i <= 16; i ++) {
			dataCells[i - 1] = $('#cell-' + i).data('cell');
			dataNumbers[i - 1] = $('#cell-' + i + ' span').data('number');
		};

		for (var i = dataCells.length; i --;) {
			if(dataCells[i] !== dataNumbers[i]) return false;
		} return gameComplete();
	});

	$('#game-reload').on('click', function() {
		gameInit();

		$('#timer').html('<p>Click on the cells near the empty...</p>');

		$('#game-complete').css({
			'opacity': '0',
			'z-index': '0'
		});

		$('section').css({
			'opacity': '100',
			'zIndex': '100'
		});
	});
});