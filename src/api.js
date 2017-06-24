import $ from "jquery";

export const Api = function(isDoingTax) {

  this.isDoingTax = isDoingTax
  this.url = "https://api.punkapi.com/v2/beers?"

  this.isWeekend = () => {
    const dayNumber = new Date().getDay()
    return dayNumber === 0 || dayNumber === 6
  }
  this.isMorning = () => {
    const hour = new Date().getHours()
    // Morning is considered 4am to 1am
    return hour > 4 && hour < 10
  }
  this.isEvening = () => {
    const hour = new Date().getHours()
    // Evening is considered 5pm to 12am
    return hour > 17 && hour < 24
  }
  this.getUrlString = ( isDoingTax, page ) => {
    let url = this.url
    url += this.isMorning() ? "&ebc_lt=10" : ""
    url += this.isEvening() ? "&ebc_gt=30" : ""
    url += isDoingTax ? "&ibu_gt=50" : ""
    url += !this.isWeekend() ? "&abu_lt=4" : ""
    url += this.isWeekend() ? "&abu_gt=6" : ""
    url += typeof page === "number" ? `&page=${page}` : ""
    console.log( url )
    return url
  }
  this.getBeer = ( isDoingTax, page ) => {
    const url = this.getUrlString( isDoingTax, page )
    return $.get( url,  ( data ) => {} ) // returns a promise
  }
}