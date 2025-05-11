import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-parking-list',
  standalone: false,
  templateUrl: './parking-list.component.html',
  styleUrl: './parking-list.component.scss'
})
export class ParkingListComponent implements OnInit {

  parkings = [
    { id: 1, licensePlate: 'ABC1234', startTime: '08:00', duration: '2h' },
    { id: 2, licensePlate: 'XYZ9876', startTime: '09:15', duration: '1.5h' }
  ];

  ngOnInit(): void {}
}
