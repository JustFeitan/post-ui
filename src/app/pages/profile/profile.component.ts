import { Component, OnInit } from '@angular/core';
import {ReduxUser} from '../../redux/models/ReduxUser';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: ReduxUser;

  constructor() { }

  ngOnInit(): void {}
}
