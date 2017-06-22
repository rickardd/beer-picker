import { beerComponent } from './beer_component'
import { promptComponent } from './prompt_component'
import { homeComponent } from './home_component'

( () => {

  const start = () => {
    homeComponent.init()
    .then( () => {
      promptComponent.open()
        .then( ( answer ) => {
            beerComponent.init( answer )
        })
    })
  }

  // It the animation is too soon it may feel a bit tacky.
  // 1 second delay helps the user to relise what is happening.
  setTimeout( () => {start()}, 500)

})()





