import { beerListComponent } from './beer_list_component'
import { promptComponent } from './prompt_component'
import { homeComponent } from './home_component'

( () => {
  const start = () => {
    homeComponent.init()
    .then( () => {
      document.body.classList.add("color-red")
      promptComponent.open()
        .then( ( answer ) => {
          document.body.classList.remove("color-red")
          document.body.classList.add('color-green')
          beerListComponent.init( answer )
        })
      })
  }
  // It the animation is too soon it may feel a bit tacky.
  // 1 second delay helps the user to relise what is happening.
  setTimeout( () => {start()}, 500)
})()
