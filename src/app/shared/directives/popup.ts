import { AfterViewInit, Directive, ElementRef, HostListener, inject, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appPopup]'
})
export class Popup  implements AfterViewInit{

  private readonly renderer = inject(Renderer2)
  private readonly elementRef = inject(ElementRef)

  @Input() msg !:string;
  myDiv!:HTMLElement
ngAfterViewInit(): void {

 
  }

  @HostListener('mouseenter')
  addPopup():void{

     this.renderer.setStyle(this.elementRef.nativeElement, 'position', 'relative')

   this.myDiv =  this.renderer.createElement('div')

   this.renderer.setStyle(this.myDiv , 'position','absolute')
   this.renderer.setStyle(this.myDiv , 'bottom','100%')
   this.renderer.setStyle(this.myDiv , 'left','0')
   this.renderer.setStyle(this.myDiv , 'z-index','999')
   this.renderer.setStyle(this.myDiv , 'backgroundColor','#000')
   this.renderer.setStyle(this.myDiv , 'padding','5px 10px')
   this.renderer.setStyle(this.myDiv , 'border-radius','7px')
   this.renderer.setStyle(this.myDiv , 'border-radius','7px')
   this.renderer.setStyle(this.myDiv , 'color','#fff')

   this.myDiv.innerHTML = this.msg;
   this.renderer.appendChild(this.elementRef.nativeElement , this.myDiv)
  }

  @HostListener('mouseleave')
  removePopup():void{
    this.renderer.removeChild(this.elementRef.nativeElement , this.myDiv)
  }
}
