import $ from 'jquery'

export const promptComponent = ( () => {

  const prompt = document.querySelector('#prompt')

  // Remove prompt from DOM
  const kill = () => {
    prompt.remove()
  }
  const openPopUp = () => {
    $(prompt).addClass('prompt-open')
  }
  const closePopUp = () => {
    return new Promise( (resolve, reject) => {
      // Wait for css transition to end and then kill() this component.
      $(prompt).removeClass('prompt-open').addClass('prompt-close').one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", () => {
        kill()
        resolve()
      })
    })
  }

  const bind = () => {
    return new Promise( (resolve, reject) => {
      // YES
      prompt.querySelector('#prompt-yes').addEventListener('click', () => {
        closePopUp().then( () => {
          resolve( true )
        })
      })
      // NO
      prompt.querySelector('#prompt-no').addEventListener('click', () => {
        closePopUp().then( () => {
          resolve( true )
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