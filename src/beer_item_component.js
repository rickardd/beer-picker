import $ from 'jquery'

export const BeerItemComponent = function( data, template ){

  this.data = data;
  this.template = template;
  const self = this; // self can be accest within private methods.

  this.init = () => {
    this.DOM = createDOM()
    this.$DOM = $(this.DOM)
    bind()
  }

  const createDOM = () => {
      const itemClone = self.template.content.querySelector('#beer__item').cloneNode(true)
      itemClone.querySelector('.beer__name').innerText = self.data.name
      itemClone.querySelector('.beer__description').innerText = self.data.description
      itemClone.querySelector('.beer__tips').innerText = self.data.brewers_tips
      const ul = itemClone.querySelector('.beer__food-paring')
      self.data.food_pairing.forEach( text => {
        const li = document.createElement('li')
        li.innerText = text
        ul.appendChild(li)
      })
      itemClone.querySelector('.beer__image').src = self.data.image_url
      itemClone.querySelector('.beer__tag-line').innerText = self.data.tagline
      return itemClone
  }

  const bind = () => {
    $(self.DOM).find('.menu__item').bind('click', onMenuItemClick )
  }

  const getMenuLinkTag = ( elm ) => { // returns the a tag of the element
    let tag
    if ( elm.tagName.toLocaleLowerCase() === "a" )
      tag = elm
    else
      tag = elm.parentNode

    if( tag.tagName.toLocaleLowerCase() != "a" )
      new Error("Element is not expected 'a' tag.")
    else
      return tag
  }

  const setActiveMenuItem = (elm) => {
    self.$DOM.find('.menu__item').removeClass('active')
    $( getMenuLinkTag( elm ) ).addClass('active')
  }

  const changeView = (elm) => {
    const viewIndex = +getMenuLinkTag( elm ).dataset["viewIndex"];
    const currentView = self.$DOM.find('.view').eq( viewIndex )
    self.$DOM.find('.view').removeClass('view-in')
    self.$DOM.find('.view').eq( viewIndex ).addClass('view-in')
  }

  const onMenuItemClick = ( e ) => {
    e.preventDefault()
    changeView( e.target )
    setActiveMenuItem( e.target )
  }

}