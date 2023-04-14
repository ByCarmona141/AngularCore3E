import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.scss']
})
export class ActionButtonsComponent implements OnInit {

  @Input() privileges: number[] = [];
  @Input() selected = [];
  @Output() emitter: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  create(): void {
    this.emitter.emit('onCreate');
  }
}
