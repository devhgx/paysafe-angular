import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
  @Input() showToastSuccess: boolean = false;
  @Input() title: string = 'Item successfully.';
  @Input() iconStatus: string = 'success';
  constructor() {}
  closeToast() {
    this.showToastSuccess = false;
  }

  ngOnInit(): void {}
}
