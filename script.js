/*
  var layers = [
    {
      'name': 'Layer 0',
      'desc': 'Main Alpha Layer',
      'left': [
        { 'tap': 'q' },
        { 'tap': 'w' },
        { 'tap': 'e' },
        { 'tap': 'r' },
        { 'tap': 't' },

        { 'tap': 'a' },
        { 'tap': 's' },
        { 'tap': 'd', 'hold': '⌥ ' },
        { 'tap': 'f', 'hold': '⌘ ' },
        { 'tap': 'g' },

        { 'tap': 'z' },
        { 'tap': 'x' },
        { 'tap': 'c' },
        { 'tap': 'v' },
        { 'tap': 'b' },

        { 'tap': '␣ ' },
        { 'tap': '⇧ ' },
      ],
      'right': [
        { 'tap': 'y' },
        { 'tap': 'u' },
        { 'tap': 'i' },
        { 'tap': 'o' },
        { 'tap': 'p' },

        { 'tap': 'h' },
        { 'tap': 'j', 'hold': '⌘ ' },
        { 'tap': 'k', 'hold': '⌥ ' },
        { 'tap': 'l' },
        { 'tap': ';' },

        { 'tap': 'n' },
        { 'tap': 'm' },
        { 'tap': ',' },
        { 'tap': '.' },
        { 'tap': '?' },

        { 'tap': '⌃' },
        { 'tap': 'L1' },
      ]
    },
    {
      'name': 'Layer 1',
      'desc': 'Numbers/Symbols Layer',
      'left': [
        { 'tap': '!' },
        { 'tap': '@' },
        { 'tap': '#' },
        { 'tap': '$' },
        { 'tap': '%' },

        { 'tap': '1' },
        { 'tap': '2' },
        { 'tap': '3' },
        { 'tap': '4' },
        { 'tap': '5' },

        { 'tap': '/' },
        { 'tap': '<' },
        { 'tap': '(' },
        { 'tap': '[' },
        { 'tap': '{' },

        { 'tap': 'L0' },
        { 'tap': '⇧ ' },
      ],
      'right': [
        { 'tap': '^' },
        { 'tap': '&' },
        { 'tap': '*' },
        { 'tap': '~' },
        { 'tap': '|' },

        { 'tap': '6' },
        { 'tap': '7' },
        { 'tap': '8' },
        { 'tap': '9' },
        { 'tap': '0' },

        { 'tap': '}' },
        { 'tap': ']' },
        { 'tap': ')' },
        { 'tap': '>' },
        { 'tap': '\\' },

        { 'tap': '⌃' },
        { 'tap': 'L2' },
      ]
    }
  ]
*/
var layerCount = 0;

function init() {
  initAllKeys();
  addLayer();
  addLayer();
  addLayer();
  //initLayers();
  initListeners();
}

function initListeners() {
  document.body.addEventListener('click', clickHandler);
  document.body.addEventListener('dragstart', clickHandler);
  document.body.addEventListener('dragend', clickHandler);
  document.body.addEventListener('dragenter', clickHandler);
  document.body.addEventListener('dragleave', clickHandler);
}

function clickHandler(e) {
  var target = e.target;
  if (target.classList.contains('key')) {
    if (e.type == 'click' && !inAllKeys(target)) {
      // We are on a button. Toggle the lock!
      target.classList.toggle('locked');
    }
    if (e.type == 'dragstart') {
      target.classList.add('dragged');
    }
    if (e.type == 'dragend') {
      target.classList.remove('dragged');
    }
    if (e.type == 'dragenter' && !inAllKeys(target) && !target.classList.contains('locked') && !target.classList.contains('dragged')) {
      target.classList.add('over');
    }
    if (e.type == 'dragleave' && !inAllKeys(target) && !target.classList.contains('locked') && !target.classList.contains('dragged')) {
      target.classList.remove('over');
    }
  }
}

function addLayer() {
  var lc = document.querySelector('.layer-container');
  var layer = document.createElement('div');
  layer.classList.add('layer');

  var title = document.createElement('div');
  title.classList.add('label');
  title.innerHTML = 'LAYER ' + layerCount;

  var wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');
  var left = document.createElement('div');
  left.classList.add('left');
  var right = document.createElement('div');
  right.classList.add('right');

  for (let x = 0; x < 17; x++) {
    addKey(left, '', '', '', false);
  }

  for (let x = 0; x < 17; x++) {
    addKey(right, '', '', '', false);
  }

  layer.appendChild(title);
  wrapper.appendChild(left);
  wrapper.appendChild(right);
  layer.appendChild(wrapper);
  lc.appendChild(layer);
  layerCount++;
}

function addKey(parent, type, tap = '', hold = '', locked = '') {
  console.log(parent);
  console.log(type);
  console.log(tap);
  console.log(hold);
  console.log(locked);
  var key = document.createElement('div');
  key.draggable = true;
  key.classList.add('key');
  key.innerHTML = tap;
  key.dataset.type = type;
  var lock = document.createElement('i');
  lock.classList.add('lock');
  lock.classList.add('fa-solid');
  lock.classList.add('fa-lock');
  if (locked) {
    lock.classList.add('active');
  }
  key.appendChild(lock);
  if (hold !== undefined && hold !== '') {
    var h = document.createElement('div');
    h.innerHTML = hold;
    h.classList.add('hold');
    key.appendChild(h);
  }
  parent.appendChild(key);
}

function initAllKeys() {
  var ak = document.querySelector('.all-keys');

  // Modifiers
  var modifiers = ['⌘ ', '⌥ ', '⇧', '⌃'];
  modifiers.forEach(c => addKey(ak, 'mod', c));

  // Letters
  for (x = 0; x < 26; x++) {
    let chr = String.fromCharCode(97 + x);
    addKey(ak, 'alpha', chr);
  }

  // Arrows
  var modifiers = ['◄', '▼', '▲', '►'];
  modifiers.forEach(c => addKey(ak, 'arrow', c));

  // Symbols
  var symbols = '()[]{}<>/\\`~!@#$%^&*-_+=|;:\'",.?';
  [...symbols].forEach(c => addKey(ak, 'symbol', c));

  // Numbers
  for (x = 0; x < 10; x++) {
    addKey(ak, 'number', x)
  }

  // Layers
  for (x = 0; x < 7; x++) {
    addKey(ak, 'layer', 'L' + x);
  }

  // Media
  // Arrows
  var media = [
    '<i class="fa-solid fa-play"></i>',
    '<i class="fa-solid fa-pause"></i>',
    '<i class="fa-solid fa-stop"></i>',
    '<i class="fa-solid fa-shuffle"></i>',
    '<i class="fa-solid fa-forward"></i>',
    '<i class="fa-solid fa-backward"></i>',
    '<i class="fa-solid fa-forward-fast"></i>',
    '<i class="fa-solid fa-backward-fast"></i>',
    '<i class="fa-solid fa-forward-step"></i>',
    '<i class="fa-solid fa-backward-step"></i>',
    '<i class="fa-solid fa-volume-xmark"></i>',
    '<i class="fa-solid fa-volume-low"></i>',
    '<i class="fa-solid fa-volume-high"></i>',

  ];
  media.forEach(c => addKey(ak, 'media', c));

}

function initLayers() {
  layers.forEach((l, li) => initLayer(l, li));
}

function initLayer(l, li) {
  var lc = document.querySelector('.layer-container');
  var layer = document.createElement('div');
  layer.classList.add('layer');

  var title = document.createElement('div');
  title.classList.add('label');
  title.innerText = l.name;

  var left = document.createElement('div');
  left.classList.add('left');
  var right = document.createElement('div');
  right.classList.add('right');

  l.left.forEach((k, ki) => {
    addKey(left, 'left', k.tap, k.hold, false);
  });

  l.right.forEach((k, ki) => {
    addKey(right, 'right', k.tap, k.hold, false);
  });

  layer.appendChild(title);
  layer.appendChild(left);
  layer.appendChild(right);
  lc.appendChild(layer);
}

function inAllKeys(key) {
  var ak = document.querySelector('.all-keys');
  return ak.contains(key);
}

window.addEventListener('load', init);
