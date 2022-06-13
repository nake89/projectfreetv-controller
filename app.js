let els = document.querySelectorAll('.flw-item')

function highlight(itemNumber) {
  for (let i = 0; i < els.length; i++) {
    if (i === itemNumber) {
      els[itemNumber].style.border = '10px solid red'
    } else {
      els[i].style.border = ''
    }
  }
}

let postersPerLine = 8
let currentItem = 0
const gamepads = {}
let focusOnElement = ''
els[0].style.border = '10px solid red'
setInterval(buttonDetector, 300)

function buttonDetector() {
  if (focusOnElement === 'left') {
    currentItem--
    highlight(currentItem)
    focusOnElement = ''
  }

  if (focusOnElement === 'right') {
    currentItem++
    highlight(currentItem)
    focusOnElement = ''
  }
  if (focusOnElement === 'up') {
    if (currentItem > 8) {
      currentItem = currentItem - 8
    }
    highlight(currentItem)
    focusOnElement = ''
  }
  if (focusOnElement === 'down') {
    if (currentItem < 8) {
      currentItem = currentItem + 8
    }
    highlight(currentItem)
    focusOnElement = ''
  }
  focusOnElement = ''
}

function gamepadHandler(event, connecting) {
  const gamepad = event.gamepad
  // Note:
  // gamepad === navigator.getGamepads()[gamepad.index]

  if (connecting) {
    gamepads[gamepad.index] = gamepad
  } else {
    delete gamepads[gamepad.index]
  }
}

window.addEventListener(
  'gamepadconnected',
  function (e) {
    gamepadHandler(e, true)
  },
  false
)
window.addEventListener(
  'gamepaddisconnected',
  function (e) {
    gamepadHandler(e, false)
  },
  false
)

let start
window.addEventListener('gamepadconnected', function (e) {
  const gp = navigator.getGamepads()[e.gamepad.index]
  let toConsole =
    'Gamepad connected at index ' +
    gp.index +
    ': ' +
    gp.id +
    '. It has ' +
    gp.buttons.length +
    ' buttons and ' +
    gp.axes.length +
    ' axes.'
  console.log(toConsole)

  gameLoop()
})

function buttonPressed(b) {
  if (typeof b == 'object') {
    return b.pressed
  }
  return b == 1.0
}

function gameLoop() {
  const gamepads = navigator.getGamepads
    ? navigator.getGamepads()
    : navigator.webkitGetGamepads
    ? navigator.webkitGetGamepads()
    : []
  if (!gamepads) {
    return
  }

  const gp = gamepads[0]
  for (let i = 0; i < gp.buttons.length; i++) {
    if (buttonPressed(gp.buttons[i])) {
      //   console.log(i)
    }
  }
  if (gp.axes[6] < 0) {
    // console.log('left button pressed')
    focusOnElement = 'left'
  }
  if (gp.axes[6] > 0) {
    // console.log('right button pressed')
    focusOnElement = 'right'
    // highlight(currentItem)
  }
  if (gp.axes[7] < 0) {
    focusOnElement = 'up'
    // console.log('up button pressed')
  }
  if (gp.axes[7] > 0) {
    focusOnElement = 'down'
    // console.log('down button pressed')
  }
  for (let i = 0; i < gp.axes.length; i++) {
    // console.log(`gp.axes[${i}]: ${gp.axes[i]}`)
  }

  start = requestAnimationFrame(gameLoop)
}
