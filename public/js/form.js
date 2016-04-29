var tl = new TimelineMax({
  paused: true
});

$('.button').on('click', function() {
  var $self = $(this);
  if ($self.hasClass('active') && $('form').valid()) {
    tl.resume();
  } else if (tl.progress() == 0) {
    tl.play();
    $self.addClass('active');
  }
  return false;
})

CSSPlugin.defaultTransformPerspective = 800;
TweenLite.set($(".container"), {
  opacity: 1
});

function getButtonTimeline() {
  var $button = $('.button');
  var tl = new TimelineLite();
  tl
    .set($button, {
      y: -300
    })
    .to($button, 0.1, {
      scale: 0.9,
      yoyo: true,
      repeat: 1
    })
    .to($button, 1, {
      borderRadius: 5,
      height: 52,
      width: '100%',
      text: {
        value: "Submit",
        oldClass: "signup",
        newClass: "submit",
        delimiter: " "
      },
      ease: Power4.easeInOut,
      y: 0
    }, '+=0.55');
  return tl;
}

function getContainerTimeline() {
  var $container = $('.container');
  var tl = new TimelineLite();
  tl
    .to($container, 1, {
      width: 316,
      ease: Power4.easeIn
    })
    .to($container, 0.5, {
      height: 346,
      ease: Power4.easeOut
    });
  return tl;
}

function getFormTimeline() {
  var $title = $('h2'),
    $form = $('form'),
    $fieldset = $('fieldset'),
    tl = new TimelineMax();

  var setForm = function() {
    $('.user input').focus();
    $('input').prop('required', true);
    $('input').addClass('required');
  };

  tl
    .from($title, 0.5, {
      autoAlpha: 0,
      rotationX: -90,
      transformOrigin: "center top"
    })
    .staggerFrom($fieldset, 0.7, {
      x: -500,
      autoAlpha: 0,
      scale: 0,
      ease: Power3.easeOut
    }, 0.2)
    .add(setForm);
  return tl;
}

function getFlipTimeline() {
  var $container = $('.container');
  var tl = new TimelineLite();
  tl.to($container, 1.2, {
    rotationY: 180,
    ease: Back.easeOut
  });
  return tl;
}

function getLoaderTimeline() {
  var $submit = $('.button');
  var tl = new TimelineLite();
  tl.to($submit, 0.01, {
    text: {
      value: "",
      oldClass: "submit",
      newClass: "fa fa-spinner fa-spin",
      delimiter: " "
    }
  }); // ff fix
  return tl;
}

function getBackTimeline() {
  var $back = $('.back');
  var $h2 = $('.title');
  var $p = $('div.p');
  var tl = new TimelineLite();
  tl.from($h2, 0.5, {
      autoAlpha: 0,
      rotationX: -90,
      transformOrigin: "center top",
      ease: Back.easeOut
    })
    .staggerFrom($p, 0.5, {
      scale: 0,
      ease: Back.easeOut
    }, 0.2, '-=0.3');
  return tl;
}

var $container = $('.container');
tl
  .add('start', 0)
  .add(getButtonTimeline(), 'start')
  .add(getContainerTimeline(), 'start')
  .add(getFormTimeline())
  .addPause()
  .add(getLoaderTimeline())
  .set($container, {transformStyle: 'preserve-3d'})
  .add(getFlipTimeline(), '+=2')
  .add(getBackTimeline(), '-=0.5');
