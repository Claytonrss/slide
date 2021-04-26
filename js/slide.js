export default class Slide{

  constructor(slide, wrapper){
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
    console.log(this.wrapper)
  }

  onStart(event){
    event.preventDefault();
    this.wrapper.addEventListener('mousemove', this.onMove);
    console.log('onStart')
  }

  onMove(event){
    event.preventDefault();
    console.log('onMove')
  }
  
  onEnd(event){
    event.preventDefault();
    this.wrapper.removeEventListener('mousemove',this.onMove)
    console.log('onEnd')
  }

  addSlideEvents(){
    this.wrapper.addEventListener('mousedown', this.onStart);
    this.wrapper.addEventListener('mouseup', this.onEnd);
  }

  bindEvents(){
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  init(){
    this.bindEvents();
    this.addSlideEvents();
  }
  
}