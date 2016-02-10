var fadeSpeed = 700;

$(function() {
  var viewport = $('.stupidity');

  showIntroMessageAndRunGame(viewport);
});

var showIntroMessageAndRunGame = function(viewport) {
  var level = 1;
  var introMessage = 'tap';

  viewport.hide();
  viewport.append('<div class="box no-border">' + introMessage + '</div>');
  viewport.fadeIn(fadeSpeed, function() {
    viewport.fadeOut(fadeSpeed, function() {
      displayBoxes(1, viewport);
    });
  });
};

var displayBoxes = function(level, viewport) {
  viewport.html('');

  for(row = 0; row < level; ++row) {
    var rowElement = $('<div id="' + row + '" class="row"></div>');
    viewport.append(rowElement);

    for(col = 0; col < level; ++col) {
      rowElement.append('<div class="box"></div>');
    }
  }

  defineCallback(level, viewport);

  viewport.fadeIn(fadeSpeed);
};

var defineCallback = function(level, viewport) {
  var boxes = viewport.find('.box');

  boxes.click(function(event) {
    $(event.target).toggleClass('tapped');

    nextLevelIfAllTapped(level, viewport, boxes);
  });
};

var nextLevelIfAllTapped = function(level, viewport, boxes) {
  if(allTapped(boxes)) {
    viewport.fadeOut(fadeSpeed, function() {
      displayBoxes(level * 2, viewport);
    });
  }
};

var allTapped = function(boxes) {
  return _.every(boxes, function(element) {
    return $(element).hasClass('tapped');
  });
};
