import { Component, Input } from '@angular/core';

@Component({
  selector: 'flight-workspace-dogname',
  templateUrl: './dogname.component.html',
  styleUrls: ['./dogname.component.css'],
})
export class DognameComponent {
  @Input() dogName?: string;
  @Input() greeting = 'Wuff';
}
