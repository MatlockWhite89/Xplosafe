import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalWindowService } from '../../../services/modal-window.service';

@Component({
  selector: 'app-pop-out-window',
  templateUrl: './pop-out-window.component.html',
  styleUrls: ['./pop-out-window.component.css'],
})
export class PopOutWindowComponent implements OnInit, OnDestroy {
  subscriptions: Subscription;
  presentWindow: boolean;
  @Input('pop-out-id') id: string;
  constructor(private modalWindowService: ModalWindowService) {
    this.presentWindow = false;
    this.subscriptions = new Subscription();
  }

  // Subscribes to the modal window context values.
  ngOnInit(): void {
    this.subscriptions.add(
      this.modalWindowService.popUpContextUpdated.subscribe((value) => {
        this.presentWindow = this.id === value;
      })
    );
  }

  // closes the modal window component.
  close($event: MouseEvent): void {
    $event.stopPropagation();
    this.presentWindow = false;
    this.modalWindowService.setPopOutContext(null);
  }

  // unsubscribe from all subscriptions.
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.modalWindowService.setPopOutContext(null);
  }

  // Handler of click events origination within the content of the pop-out window.
  swallowClicks($event: MouseEvent): void {
    $event.stopImmediatePropagation();
  }
}
