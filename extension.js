// define power icon
const Power = imports.ui.status.power;

// define scroll events
let _onPowerIndicatorScrollEventId;

// if detect mouse scroll up event over battery icon
function enable() {
  _onPowerIndicatorScrollEventId = powerIndicator.indicators.connect('scroll-event', ?);

// increase brightness
// show visual notification of brightness change

// if detect mouse scroll down event over battery icon
// decrease brightness
// show visual notification of brightness change



