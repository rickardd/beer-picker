import $ from 'jquery'

export const promptComponent = ( () => {

  const template = document.querySelector('#template-prompt')
  const DOM = template.content.querySelector('#prompt')
  const $DOM = $(DOM)
  const view = document.querySelector('#prompt-view')

  // Remove prompt from DOM
  const kill = () => {
    view.remove()
  }
  const openPopUp = () => {
    view.appendChild(DOM)
    setTimeout( () => { $DOM.addClass('prompt-open') }, 500 )
  }
  const closePopUp = () => {
    return new Promise( (resolve, reject) => {
      // Wait for css transition to end and then kill() this component.
      $DOM.removeClass('prompt-open').addClass('prompt-close')
        .one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", () => {
          kill()
          resolve()
      })
    })
  }
  const bind = () => {
    return new Promise( (resolve, reject) => {
      // YES
      DOM.querySelector('#prompt-yes').addEventListener('click', () => {
        closePopUp().then( () => {
          resolve( true )
        })
      })
      // NO
      DOM.querySelector('#prompt-no').addEventListener('click', () => {
        closePopUp().then( () => {
          resolve( false )
        })
      })
    })
  }
  const open = () => {
    openPopUp()
    return bind()
  }

  return {
    open: open
  }

})()