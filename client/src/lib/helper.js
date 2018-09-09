export function enableEnterKey (input) {
  /* Store original event listener */
  const _addEventListener = input.addEventListener
    ? input.addEventListener
    : input.attachEvent

  const addEventListenerWrapper = (type, listener) => {
    if (type === 'keydown') {
      /* Store existing listener function */
      const _listener = listener
      listener = event => {
        /* Simulate a 'down arrow' keypress if no address has been selected */
        const suggestion_selected =
          document.getElementsByClassName('pac-item-selected').length > 0
        if (event.which === 13 && !suggestion_selected) {
          const e = JSON.parse(JSON.stringify(event))
          e.which = 40
          e.keyCode = 40
          _listener.apply(input, [e])
          event.preventDefault()
        }
        _listener.apply(input, [event])
      }
    }
    _addEventListener.apply(input, [type, listener])
  }

  input.addEventListener = addEventListenerWrapper
  input.attachEvent = addEventListenerWrapper
}
