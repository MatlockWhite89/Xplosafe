import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ModalWindowService {
  modalContextUpdated = new BehaviorSubject<any>(null);
  popUpContextUpdated = new BehaviorSubject<any>(null);
  context: string;
  constructor() {
    this.context = null;
  }

  // sets the display message value referenced by the modal window component.
  public setModalContext(context?: string): void {
    this.context = context;
    this.modalContextUpdated.next(this.context);
  }

  // Invokes a new event for the subscribers of the popUpContext.
  public setPopOutContext(context?: string): void {
    this.context = context;
    this.popUpContextUpdated.next(this.context);
  }

  // gets the display message value referenced by the modal window component.
  public getModalContext(): string {
    return this.context;
  }
}
