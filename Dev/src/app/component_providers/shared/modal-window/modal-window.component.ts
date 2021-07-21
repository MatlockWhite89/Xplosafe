import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalWindowService } from '../../../services/modal-window.service';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.css'],
})
export class ModalWindowComponent implements OnInit, OnDestroy {
  contextString?: string;
  subscriptions: Subscription;
  modalWindow: HTMLElement;
  windowPane: any;
  presentWindow: boolean;

  constructor(private modalWindowService: ModalWindowService) {
    this.contextString = null;
    this.presentWindow = false;
    this.subscriptions = new Subscription();
  }

  // sets the display message value referenced by the modal window component.
  setContext(context: string): void {
    this.contextString = context;
    console.log('context set to ' + context);
    this.presentWindow =
      this.contextString !== null && this.contextString !== undefined;
  }

  // Subscribes to the modal window context values.
  ngOnInit(): void {
    this.subscriptions.add(
      this.modalWindowService.modalContextUpdated.subscribe((value) => {
        this.setContext(value);
      })
    );
  }

  // closes the modal window component.
  close(): void {
    this.setContext(null);
  }

  // unsubscribe from all subscriptions.
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
