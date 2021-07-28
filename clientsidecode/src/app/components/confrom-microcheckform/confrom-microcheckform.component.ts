import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import * as braintree from 'braintree-web';
import { HttpserviceService } from 'src/app/httpservice.service';

@Component({
	selector: 'app-confrom-microcheckform',
	templateUrl: './confrom-microcheckform.component.html',
	styleUrls: [ './confrom-microcheckform.component.css' ]
})
export class ConfromMicrocheckformComponent implements OnInit {
	transactionID: any;
	confirmform: FormGroup = new FormGroup({
		firstBalance: new FormControl('17', Validators.required),
		secondBalance: new FormControl('29', Validators.required)
	});

	constructor(private route: ActivatedRoute, private router: Router, private service: HttpserviceService) {}

	ngOnInit(): void {}
	onSubmit() {
		console.log(this.confirmform);
		this.service.payandfinish(this.confirmform.value).subscribe((result: any) => {
			console.log('data from server for comformatition:', result.status);
			if (result.status == 'success') {
				// window.alert('transaction successfull ');
				if (window.confirm('do u want to print reciept')) {
					this.router.navigate([ '/print']);
				} else {
					window.alert('thank you ');
					this.router.navigate([ '/form' ]);
				}
			} else {
				window.alert('froadualent tranction check conformation number');
			}
		});
	}
}
