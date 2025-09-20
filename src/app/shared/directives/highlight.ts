import { Directive, ElementRef, HostListener, inject, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class Highlight {

private readonly el = inject(ElementRef)
private readonly renderer2 = inject(Renderer2)


@HostListener('mouseenter')
mouseEnter():void{
  this.addStyle('yellow')
}

@HostListener('mouseleave')
mouseleave():void{
  this.addStyle('')
}

addStyle(color:string){
this.renderer2.setStyle(this.el.nativeElement , 'backgroundColor' , color)
}
}
