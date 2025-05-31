export const to_export_on_debug = {}
let is_debug = false

export function export_on_window(items) {
  if (typeof items === 'object') {
    for (const [name, value] of Object.entries(items)) {
      console.log('export', name, value)
      window[name] = value
    }
    return
  }
};

export function on_debug(items) {
  if (typeof items === 'object') {
    for (const [name, value] of Object.entries(items)) {
      to_export_on_debug[name] = value

      if (is_debug) {
        console.log('export', name, value)
        window[name] = value
      }
    }
  }
}

export function _set_debug(value) {
  is_debug = value
}

export function get_debug() {
  return is_debug
}

export function init_debug(store, actions, slices) {
  function debug() {
    if (window.undebug) {
      if (typeof window.undebug === 'function') {
        window.undebug()
      }
    }

    let unsubribe = store.subscribe(() => {
      const state = store.getState()
      export_on_window({ state })
    })

    store.dispatch({ type: 'DEBUG' })

    export_on_window({ slices, actions, store })
    export_on_window(to_export_on_debug)
    _set_debug(true)

    const _undebug = () => {
      unsubribe()
      _set_debug(false)
      delete window.state
      delete window.slices
      delete window.actions
      delete window.store
      delete window.undebug
      for (const name of Object.keys(to_export_on_debug)) {
        delete window[name]
      }
      store.dispatch({ type: 'UNDEBUG' })
    }
    const undebug = () => _undebug()
    export_on_window({ undebug })
    return () => undebug()
  }

  export_on_window({
    debug: () => debug()
  });

  debug()
}

export const debug_reducer = {
  _debug: function reducer(state, action) {
    if (get_debug()) {
      const last_action = { ...action, _time: new Date().getTime() }
      on_debug({ last_action })
    }
    return null
  },
}

window.to_export_on_debug = to_export_on_debug
