import {Component, DoCheck, Input, OnChanges, OnInit} from '@angular/core';
import {query} from '@angular/animations';
import {Action} from '../../redux/models/Action';
import {ActionTypes} from '../../redux/models/ActionTypes';
import {Store} from '@ngrx/store';
import {AuthApiService} from '../../services/api/AuthApiService';
import {User} from '../../models/common/User';
import {ReduxUser} from '../../redux/models/ReduxUser';
import {HeaderService} from '../../services/logic/HeaderService';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Location} from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {

  menuVisible = false;
  isActive: boolean;
  user: ReduxUser;
  constructor(private store: Store<any>,
              private authService: AuthApiService,
              public headerService: HeaderService,
              public router: ActivatedRoute,
              public location: Location) { }


  ngOnInit(): void {
    this.store.select('user').subscribe(store => this.user = store);
  }

  ngDoCheck(): void {
    if (this.location.path() === '/account') {
      this.isActive = true;
    } else {
      this.isActive = false;
    }

    this.headerService.changeSearchVisible();
    console.log(this.headerService.getSearchVisible());
  }

  reverseMenuVisibility() {
    this.menuVisible = !this.menuVisible;
  }

  hideMenu() {
    this.menuVisible = false;
  }

  unauthorized() {
    this.authService.unauthorizedTokens();
    this.store.dispatch(new Action(ActionTypes.UNAUTHORIZED));
  }
}
