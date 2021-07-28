import { HttpserviceService } from 'src/app/httpservice.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-printreciept',
  templateUrl: './printreciept.component.html',
  styleUrls: ['./printreciept.component.css']
})
export class PrintrecieptComponent implements OnInit {

	constructor(private route: ActivatedRoute, private router: Router, private service: HttpserviceService) {}
  print: any;
  dateObj = new Date();
  month = this.dateObj.getUTCMonth() + 1;
  day = this.dateObj.getUTCDate();
  year = this.dateObj.getUTCFullYear();
  newdate = this.month + "/" + this.day + "/" + this.year
  tranacationID: any;
  billingAddress: any;
  ngOnInit(): void {
    this.service.printreciept().subscribe((data: any) => {
      // console.log("print yemohone", data);
      console.log("data", data.data.userdetail)
      this.tranacationID=data.tranacatioID
      this.print = data.data.userdetail;
      this.billingAddress=data.data.userdetail.billingAddress
    })
  }
  anotherpayment() {
    this.router.navigate([ '/form' ]);
}


}
