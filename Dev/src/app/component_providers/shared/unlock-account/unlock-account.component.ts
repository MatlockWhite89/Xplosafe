import {Component, OnDestroy, OnInit} from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AccountService } from '../../../services/account.service';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../../../shared/user.model';
import {Subscription} from 'rxjs';
import {ModalWindowService} from '../../../services/modal-window.service';

@Component({
  selector: 'app-unlock-account',
  templateUrl: './unlock-account.component.html',
  styleUrls: ['./unlock-account.component.css'],
})
export class UnlockAccountComponent implements OnInit, OnDestroy {
  accountInformation = new FormGroup({
    lockedAccounts: new FormControl(),
    unlockedAccounts: new FormControl(),
  });

  lockedUsers: User = null;
  unlockedUsers: User = null;
  showAcctForm: boolean;
  subscription: Subscription;

  constructor(private accountService: AccountService,
              private modalService: ModalWindowService) {
    this.showAcctForm = false;
    this.subscription = new Subscription();
    const lockedAcctsSub = this.accountService.lockedAccounts.subscribe((value) => {
      this.lockedUsers = value;
      if (value !== null && value.length > 0) {
        this.accountInformation.controls.lockedAccounts.setValue(
          this.lockedUsers
        );
      }
    });

    const unlockedAcctsSub = this.accountService.unlockedAccounts.subscribe(
      (value) => {
      this.unlockedUsers = value;
      if (value !== null && value.length > 0) {
        this.accountInformation.controls.unlockedAccounts.setValue(
          this.unlockedUsers
        );
      }
    });

    this.subscription.add(lockedAcctsSub);
    this.subscription.add(unlockedAcctsSub);
  }

  unlockAcct(): void {
    const selectedAcct = this.accountInformation.controls.lockedAccounts.value;
    if (
      selectedAcct === null ||
      selectedAcct === undefined ||
      selectedAcct === ''
    ) {
      this.modalService.setModalContext('Account Information Not Found: Please check your input.');
      return;
    }

    this.accountService.unlockAccount(selectedAcct);
  }

  lockAcct(): void {
    const selectedAcct = this.accountInformation.controls.unlockedAccounts
      .value;
    if (
      selectedAcct === null ||
      selectedAcct === undefined ||
      selectedAcct === ''
    ) {
      this.modalService.setModalContext('Account Information Not Found: Please check your input.');
      return;
    }

    this.accountService.lockAccount(selectedAcct);
  }

  lockedAccountValues(): void {
    this.accountService.getLockedAccounts();
    const lockedAcctsSub = this.accountService.lockedAccounts.subscribe((value) => {
      this.lockedUsers = value;
      if (value !== null && value.length > 0) {
        this.accountInformation.controls.lockedAccounts.setValue(
          this.lockedUsers
        );
      }
    });

    this.subscription.add(lockedAcctsSub);
  }

  unlockedAccountValues(): void {
    this.accountService.getUnLockedAccounts();
    const unlockedAcctsSub = this.accountService.unlockedAccounts.subscribe((value) => {
      this.unlockedUsers = value;
      if (value !== null && value.length > 0) {
        this.accountInformation.controls.unlockedAccounts.setValue(this.unlockedUsers);
      }
    });

    this.subscription.add(unlockedAcctsSub);
  }

  showForm(): boolean {
    this.showAcctForm = true;
    return this.showAcctForm;
  }

  ngOnInit(): void {
    this.unlockedAccountValues();
    this.lockedAccountValues();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
