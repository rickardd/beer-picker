import { Api } from './api'
import $ from 'jquery'
import { BeerItemComponent } from './beer_item_component'

export const beerListComponent = ( (api) => {

  // Animates each card to the sceen.
  const animateIn = () => {
    const $items = $('.beer__item')
    let i = 0;
    const length = $items.length
    let interval = setInterval( () => {
      $items.eq(i).addClass('anm-in')
      if( i >= length )
        clearInterval( interval )

      i += 1
    }, 200)
  }
  const populate = ( beers ) => {
    const template = document.querySelector("#template-beer-item") // template to populate
    const beerList = document.querySelector('#beer__list') // elemnt to parse item to
    beers.forEach( b => {
      const item = new BeerItemComponent( b, template )
      item.init()
      beerList.appendChild( item.DOM )
    })
    animateIn()
  }
  const init = ( isDoingTax ) => {
    api.getBeer( isDoingTax, 1 )
    .done( ( beers ) => {
      populate( beers )
    })
    .fail( ( error ) => {
       console.error( error, "failed to get data." )
    })
  }

  return {
    init: init
  }

})( new Api() )