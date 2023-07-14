import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponsiveHelperComponent } from './components/responsive-helper/responsive-helper.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { ModalComponent } from '../modules/layout/components/modal/modal.component';

@NgModule({
  declarations: [ResponsiveHelperComponent, ClickOutsideDirective, ModalComponent],
  imports: [CommonModule],
  exports: [ResponsiveHelperComponent, ClickOutsideDirective, ModalComponent],
})
export class SharedModule {}
