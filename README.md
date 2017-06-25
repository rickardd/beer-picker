# Beer Picker

This application suggests beers based on day, time and type of work you are currently doing.

## Run project

```
$ npm install
$ npm start
http://localhost:8080/

// css files are committed to the repository so following is not required to run the project.
$ grunt sass
$ grunt watch
```

## How I tackled the problem

Once I understood the project description and the api, I thought about...

- Target group
- The feeling of the app. Colours, shapes, animations and such.
- The structure. Drew wireframes, decided what info I wanted to display.
- What technologies to use. such as React, Angular2, Vanilla JavaScript, jQuery, Sass compiler...

### Target group

My target group is investors who loves trying new beers without feeling it's rocket science.
Drinking and picking beer should be easy and fun. He/she likes modern web applications.

### Key words

- Easy
- Modern
- Fun

### Feeling of the app and UI.

To target the keywords I went for... ***"Material design"*** (with sharp edges, sharp strong shadows, and vibrant colours),
***"Card design"*** (like pinterest.com and many other sites today), ***Animations*** (Animations plays a big part to give the feeling of modern and fun).

### Structure and UX

To target the first keyword easy I wanted to take the user on a one-way-journey which looks like this
- Enter the site.
- Explanation what the app is about.
- Only one call-to-action. "Try".
- Ask the user if he/she is working with tax reports.
- List suggested beers.

When presenting each beer I picket the most interesting facts about the beer. Again, it should be easy and not rocket
science to pick a beer.

### Technologies

I did consider using Angular2 or React.
But in order to show more code and solutions I decided to not rely on a framework. I made it with JavasCript and some jQuery.

Project setup...
- Webpack
- Babel
- Grunt for scss compiling.


## UI and UX together

***The challenge with the list of beers:*** I wanted ...

- headline,tag-line and image to **always** be visible.
- Fit some kind of navigation, ether menu or new/prev-buttons.
- Changeable content (description, tips, food) with animations.

The **solution** you can see when you run the project. Worth to mention is the navigation fills 3 purposes.

- Strong purple/pink makes it pop out more.
- The background color also allows the content animation to move in and out behind the menu without looking weird.
- A space to present more graphical object such as icons. More interesting for the eye.

The beer-list itself animates each beer-item in to the stage like a waterfall effect. I use animations as part of the design to create a better experience.

## Problems and solutions

### Handling different views
<!-- - ***Problem:*** Populate the DOM with a complex html structure -->
- ***Solution:*** By using the html ``<template>`` tag (which are not rendered in the DOM) I can create the markup within, then clone the markup, populate and append the DOM.

### Controlling the flow. Displaying and killing right view after action.
<!-- - ***Problem:*** Controlling the flow. displaying views like home-page, prompt, list of beers; based on actions -->
- ***Solution:*** By using promises I could easily control what is happening when. Consider...

```
// index.html
const start = () => {
  homeComponent.init()
  .then( () => {
    promptComponent.open()
      .then( ( answer ) => {
          beerListComponent.init( answer )
      })
  })
}
```

Following code waits for two promises, button-click and animation complete.

```
// home_component.js

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
```

## Browser support

The application is tested on Firefox and Chrome on a Mac.














