export default class Slide{

  constructor(slide, wrapper){
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
    this.distances = { finalPosition: 0, startX:0, movement: 0}
  }

  updatePosition(clientX){
    this.distances.movement = (this.distances.startX - clientX) * 1.2;
    return this.distances.finalPosition - this.distances.movement;
  }

  moveSlide(distX){
    this.distances.movePosition = distX;
    this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
  }

  onStart(event){
    event.preventDefault();
    this.distances.startX = event.clientX;
    this.wrapper.addEventListener('mousemove', this.onMove);
  }

  onMove(event){
    event.preventDefault();
    const finalPosition = this.updatePosition(event.clientX);
    this.moveSlide(finalPosition);
  }
  
  onEnd(event){
    event.preventDefault();
    this.distances.finalPosition = this.distances.movePosition;
    this.wrapper.removeEventListener('mousemove',this.onMove)
  }

  addSlideEvents(){
    this.wrapper.addEventListener('mousedown', this.onStart);
    this.wrapper.addEventListener('mouseup', this.onEnd);
    this.wrapper.addEventListener('mouseleave', this.onEnd);
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