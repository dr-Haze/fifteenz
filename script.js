;var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
	 dataNumbers = [],
 	 dataCells = [],
 	 interval, rSec, rMin,
 	 timerActive = false;

function buildNumberCells() {
	for (var i = 1; i <= 16; i ++) {
		$('#cell-' + i).html('<div class="game-number-inner"><span id="num-' + numbers[i - 1] + '" data-number="' + numbers[i - 1] +'">' + numbers[i - 1] + '</span></div>');
	};
};

function shuffleNumbers() {
	var valid = false;

	while (!valid) {
		var arrayLength = numbers.length,
			temporary,
			index,
			i, j,
			result = 0;

		while (arrayLength > 0) {
			index = Math.floor(Math.random() * arrayLength);
			arrayLength --;
			temporary = numbers[arrayLength];
			numbers[arrayLength] = numbers[index];
			numbers[index] = temporary;
		};

		arrayLength = numbers.length;

		for (i = 0; i < arrayLength; i ++) {
			for (j = i + 1; j < arrayLength; j ++) {
				if (numbers[i] > numbers[j]) {
					result ++;
				};
			};
		};

		console.log(numbers);
		console.log(result);

		if (result % 2 === 0) {
			valid = true;
			return numbers;
		};
	};
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
	var sec, min, timeCounter,
		timer = $('#timer'),
		// startTimeString = '<span id="min">00</span><span id="blink">:</span><span id="sec">00</span>';
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
			// $('#blink').addClass('blink');
			// $('#min').html(rMin.slice(- 2));
			// $('#sec').html(rSec.slice(- 2));

			if (min == 10) {
			// if (sec == 3) {
				setTimeout(function() {
					clearInterval(interval);
					clearTimeout(timeCounter);

					$('#blink').removeClass('blink');

					timerActive = true;

					smoothTransition(timer, '<p>So slow... Click on <b>\'RELOAD\'</b> in the bottom.</p>');

					$('.game-number').addClass('opacity-low cursor-low');
					$('#help span').addClass('attention');

					disableMovable();

					setTimeout(function () {
						$('#game-container').removeClass('no-image');
					}, 200);
				}, 1000);
			};
		}, 1000);

		setTimeout(function() {
			var timeCounter = setTimeout(function() {
					clearInterval(interval);
				}, 600000);
				// }, 3000);
		}, 500);
	};

	timerActive = true;
};

function gameComplete() {
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
	var cellIndex = $('#num-16').parent().parent().data('cell');

	$('#cell-' + (cellIndex - 4) + ' span, #cell-' + (cellIndex - 1) + ' span, #cell-' + (cellIndex + 1) + ' span, #cell-' + (cellIndex + 4) + ' span').addClass('movable').parent().addClass('parent-hover');
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
	}, 200);
};

function gameInit() {
	clearInterval(interval);

	timerActive = false;
	
	$('#game-container').addClass('no-image');

	var timer = $('#timer');

	smoothTransition(timer, '<p>Click on the cells near the empty...</p>');

	shuffleNumbers();
	buildNumberCells();
	makeMovable();

	$('.game-number').removeClass('opacity-low cursor-low empty-cell');
	$('#game-complete').addClass('opacity-low z-index-low');
	$('section').removeClass('opacity-low z-index-low');
	$('#help span').removeClass('attention');
	$('#num-16').parent().parent().addClass('empty-cell');
	$('.movable').parent().parent().addClass('target-cell');
};

$(document).ready(function() {
	gameInit();

	$(document).on('click', '.movable', function() {
		gameTimer();

		var numberHolder = $(this).parent(),
			cellHolder = $(this).parent().parent();

		$('.game-number').removeClass('empty-cell');

		changeCell(cellHolder.data('cell'));
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