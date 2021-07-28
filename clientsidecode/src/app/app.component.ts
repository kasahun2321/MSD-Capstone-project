import { HttpserviceService } from './httpservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenError } from '@angular/compiler/src/ml_parser/lexer';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';
import * as braintree from 'braintree-web';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ]
})
export class AppComponent {	
	title = 'ACH Payment system';
	constructor(private route: ActivatedRoute,
		private router: Router,
		private service: HttpserviceService) { }
	options()
	
	{

this.router.navigate(['/form'])
	}
}
