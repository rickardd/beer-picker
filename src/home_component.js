import $ from 'jquery'

export const homeComponent = ( () => {

  const home = document.querySelector('#home')

  // Remove home from DOM
  const kill = () => {
    home.remove()
  }
  const open = () => {
    $(home).addClass('home--open')
  }
  const close = () => {
    return new Promise( (resolve, reject) => {
      // Wait for css transition to end and then kill() this component.
      $(home).removeClass('home--open').addClass('home-close').one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", () => {
        kill()
        resolve()
      })
    })
  }

  const bind = () => {
    return new Promise( (resolve, reject) => {
      home.querySelector('#home-start-button').addEventListener('click', () => {
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