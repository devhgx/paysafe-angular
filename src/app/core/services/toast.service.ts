import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toastTitle:string = "Success";
  showToastSuccess :boolean = false;
  iconToastStatus:string  = "success";


  toastSuccess(message: string){
    this.showToastSuccess = true;
    this.toastTitle = message
    this.iconToastStatus = "success"
  }
  toastError(message: string){
    this.showToastSuccess = true;
    this.toastTitle = message
    this.iconToastStatus = "danger"
  }
  toastWarning(message: string){
    this.showToastSuccess = true;
    this.toastTitle = message
    this.iconToastStatus = "warning"
  }
  toastClose(){
    this.showToastSuccess = false;
  }
  toastOpen(){
    this.showToastSuccess = true;
  }
}
