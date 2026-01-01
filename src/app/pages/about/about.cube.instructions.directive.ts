import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[cube-instructions]'
})
export class AboutCubeInstructionsDirective {
  @Input('cube-instructions') key!: string;

  constructor(public template: TemplateRef<any>) {}
}
