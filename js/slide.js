export default class Slide{

  constructor(slide, wrapper){
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
    this.distances = { finalPosition: 0, startX:0, movement: 0}
  }

  updatePosition(clientX){
    this.distances.movement = (this.distances.startX - clientX) * 1.6;
    return this.distances.finalPosition - this.distances.movement;
  }

  moveSlide(distX){
    this.distances.movePosition = distX;
    this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
  }

  onStart(event){

    let moveType;

    if(event.type == 'mousedown'){
      event.preventDefault();
      moveType = 'mousemove';
      this.distances.startX = event.clientX;
    }
    else{
      moveType = 'touchmove'
      this.distances.startX = Math.floor(event.changedTouches[0].clientX);
    }
    
    this.wrapper.addEventListener(moveType, this.onMove);

  }

  onMove(event){
    const pointerPosition = (event.type == 'mousemove') ? event.clientX : event.changedTouches[0].clientX;
    const finalPosition = this.updatePosition(pointerPosition);
    this.moveSlide(finalPosition);
  }
  
  onEnd(event){
    const moveType = (event.type == 'mouseup') ? 'mousemove' : 'touchmove';
    this.distances.finalPosition = this.distances.movePosition;
    this.wrapper.removeEventListener(moveType,this.onMove)
  }

  addSlideEvents(){
    this.wrapper.addEventListener('mousedown', this.onStart);
    this.wrapper.addEventListener('touchstart', this.onStart);
    this.wrapper.addEventListener('mouseup', this.onEnd);
    this.wrapper.addEventListener('touchend', this.onEnd);
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