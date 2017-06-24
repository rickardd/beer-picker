import $ from 'jquery'

export const homeComponent = ( () => {

  const DOM = document.querySelector('#home-view')
  const $DOM = $(DOM)

  // Remove home from DOM
  const kill = () => {
    DOM.remove()
  }
  const open = () => {
    $DOM.addClass('home--open')
  }
  const close = () => {
    return new Promise( (resolve, reject) => {
      // Wait for css transition to end and then kill() this component.
      $DOM.removeClass('home--open').addClass('home-close')
        .one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", () => {
          kill()
          resolve()
      })
    })
  }
  const bind = () => {
    return new Promise( (resolve, reject) => {
      DOM.querySelector('#home-start-button').addEventListener('click', () => {
        close().then( () => {
          resolve( true )
        })
      })
    })
  }
  const init = () => {
    open()
    return bind()
  }

  return {
    init: init
  }

})()