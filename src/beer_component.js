import { Api } from './api'
import $ from 'jquery'

export const beerComponent = ( (api) => {

  // Animates each card to the sceen.
  const animateIn = () => {
    const $items = $('.beer__item')
    let i = 0;
    let length = $items.length
    let interval = setInterval( () => {
      $items.eq(i).addClass('anm-in')
      if( i >= length )
        clearInterval( interval )

      i += 1
    }, 200)
  }

  const populateList = ( beers ) => {
    const template = document.querySelector("#template-beer-item") // template to populate
    const beerList = document.querySelector('#beer__list') // elemnt to parse item to
    beers.forEach( b => {
      const itemClone = template.content.querySelector('#beer__item').cloneNode(true)
      itemClone.querySelector('.beer__name').innerText = b.name
      itemClone.querySelector('.beer__description').innerText = b.description
      itemClone.querySelector('.beer__tips').innerText = b.brewers_tips
      const ul = itemClone.querySelector('.beer__food-paring')
      b.food_pairing.forEach( text => {
        const li = document.createElement('li')
        li.innerText = text
        ul.appendChild(li)
      })
      itemClone.querySelector('.beer__image').src = b.image_url
      itemClone.querySelector('.beer__tag-line').innerText = b.tagline
      beerList.appendChild( itemClone )
    })
    bind()
    animateIn()
  }

  const setActiveMenuItem = ( elm ) => {
    const $item = $(elm).parents('.beer__item')
    $item.find('.beer__menu-item').removeClass('active')
    $item.find(elm).addClass('active')
  }

  const changeView = (elm) => {
    const $item = $(elm).parents('.beer__item')
    const viewIndex = +elm.dataset["viewIndex"];
    const currentView = $item.find('.view').eq( viewIndex )
    $item.find('.view').removeClass('view-in')
    $item.find('.view').eq( viewIndex ).addClass('view-in')
  }

  const onMenuItemClick = ( e ) => {
    e.preventDefault()
    changeView( e.target )
    setActiveMenuItem( e.target )
  }

  const bind = () => {
    $('.beer__menu-item').bind('click', onMenuItemClick )
  }

  const init = ( isDoingTax ) => {
    api.getBeer( isDoingTax, 1 )
    .done( ( beers ) => {
      populateList( beers )
    })
    .fail( ( error ) => {
       console.error( error, "failed to get data." )
    })
  }

  return {
    init: init
  }

})( new Api() )