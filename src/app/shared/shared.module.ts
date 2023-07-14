import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponsiveHelperComponent } from './components/responsive-helper/responsive-helper.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { ModalComponent } from '../modules/layout/components/modal/modal.component';
import { ToastComponent } from '../modules/layout/components/toast/toast.component';

@NgModule({
  declarations: [ResponsiveHelperComponent, ClickOutsideDirective, ModalComponent,ToastComponent],
  imports: [CommonModule],
  exports: [ResponsiveHelperComponent, ClickOutsideDirective, ModalComponent,ToastComponent],
})
export class SharedModule {}
