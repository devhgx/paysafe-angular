import { Component, Input, OnInit } from '@angular/core';
import { ModalModel } from 'src/app/core/models/modal.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'  ,
})
export class ModalComponent implements OnInit {
  @Input() modalData: ModalModel = {title: "Error",
    description: "Error message warning",
    buttonOk: true,
    buttonClose: true,
    buttonOkName: "OK",
    buttonCloseName: "Close",
    status: true
  };
  constructor() {}

  close(){
    this.modalData.status = false;
  }

  ngOnInit(): void {}
}
