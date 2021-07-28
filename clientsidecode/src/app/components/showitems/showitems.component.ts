import { HttpserviceService } from './../../httpservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-showitems',
  templateUrl: './showitems.component.html',
  styleUrls: ['./showitems.component.css']
})
export class ShowitemsComponent implements OnInit {

	constructor(private route: ActivatedRoute, private router: Router, private service: HttpserviceService) {}

  pay()
  {
    this.router.navigate([ '/form' ]);
  }
  ngOnInit(): void {
  }

}
