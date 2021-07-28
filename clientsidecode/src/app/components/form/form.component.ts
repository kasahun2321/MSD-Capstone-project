import { HttpserviceService } from './../../httpservice.service';
import { Component, Input, OnInit, Output } from '@angular/core';
import { TokenError } from '@angular/compiler/src/ml_parser/lexer';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';
import * as braintree from 'braintree-web';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
	token: any;
	nounce: any;
	transactioID: any = '';
	clientInstance: any;
	bankinstance: any = '';
	counter: number = 0;
	dateObj = new Date();
	month = this.dateObj.getUTCMonth() + 1;
	day = this.dateObj.getUTCDate();
	year = this.dateObj.getUTCFullYear();
	newdate = this.month + "/" + this.day + "/" + this.year
	truefalseagree = false;

	constructor(private route: ActivatedRoute,
		private router: Router,
		private service: HttpserviceService) { }

	// when the form load set the token 
	//first step of ACH transaction
	ngOnInit() {
		console.log("ng on init")
		this.service.intializetoken().subscribe((result: any) => {
			console.log('the service yemexaa', result);
			this.token = result.data;
			localStorage.setItem('token', result.data);
		});
	}


	myform: FormGroup = new FormGroup({
		firstName: new FormControl('', Validators.required),
		lastName: new FormControl('', Validators.required),
		checkboxx: new FormControl('', [Validators.required]),
		accountNumber: new FormControl('1000000000', [Validators.required, Validators.minLength(5)]),
		amount: new FormControl('', [Validators.required]),
		routingNumber: new FormControl('011000015', [Validators.required, Validators.minLength(5)]),
		accountType: new FormControl('', Validators.required),
		ownershipType: new FormControl('', Validators.required),

		billingAddress: new FormGroup({
			streetAddress: new FormControl('1 E Main St', Validators.required),
			extendedAddress: new FormControl('Suite 403', Validators.required),
			locality: new FormControl('Chicago', Validators.required),
			region: new FormControl('IL', Validators.required),
			postalCode: new FormControl('60607', Validators.required),
			countryCodeAlpha2: new FormControl('US', Validators.required)
		})
	});

	get fName() {
		return this.myform.get('firstName');
	}
	get lName() {
		return this.myform.get('lastName');
	}
	get Acno() {
		return this.myform.get('accountNumber');
	}
	get Rno() {
		return this.myform.get('routingNumber');
	}
	get amount() {
		return this.myform.get('amount');
	}
	get streatadd() {
		return this.myform.get('billingAddress')?.get('streetAddress')
	}
	get extaddress() {
		return this.myform.get('billingAddress')?.get('extendedAddress');
	}
	get locality() {
		return this.myform.get('billingAddress')?.get('locality');
	}
	get region() {
		return this.myform.get('billingAddress')?.get('region');
	}
	get postalcode() {
		return this.myform.get('billingAddress')?.get('postalCode');
	}
	get countrycode() {
		return this.myform.get('billingAddress')?.get('countryCodeAlpha2');
	}



	//form submit 
	onSubmit() {
		if (this.myform.value.checkboxx) {
			console.log(this.myform.value);

			//the submit button trigger this function
			this.createBraintree();
		} else {
			window.alert('please mark the checkbox to continue');
		}
	}


	createBraintree() {

		this.nounce = braintree.client.create(
			{
				authorization: this.token
			},
			(clientErr: any, clientInstance: any) => {
				if (clientErr) {
					console.error('There was an error creating the Client.');
					window.alert("i think ur token is not generatede check the form data")
					throw clientErr;
				}
				console.log("client instance", clientInstance);


				braintree.usBankAccount.create(
					{
						client: clientInstance
					},
					(usBankAccountErr: any, usBankAccountInstance: any) => {
						if (usBankAccountErr) {
							this.bankinstance = usBankAccountInstance;
							throw usBankAccountErr;
						}
						console.log("banck instance",usBankAccountInstance);
						// Use the usBankAccountInstance here.
						var bankDetails: any = {
							accountNumber: this.myform.value.accountNumber,
							routingNumber: this.myform.value.routingNumber,
							accountType: this.myform.value.accountType,
							ownershipType: this.myform.value.ownershipType,
							checkboxx: this.myform.value.checkboxx,
							firstName: this.myform.value.firstName,
							lastName: this.myform.value.lastName,
							amount: this.myform.value.amount,

							billingAddress: {
								streetAddress: this.myform.value.billingAddress.streetAddress,
								extendedAddress: this.myform.value.billingAddress.extendedAddress,
								locality: this.myform.value.billingAddress.locality,
								region: this.myform.value.billingAddress.region,
								postalCode: this.myform.value.billingAddress.postalCode,
								countryCodeAlpha2: this.myform.value.billingAddress.countryCodeAlpha2
							}

						};



						usBankAccountInstance.tokenize(
							{
								bankDetails: bankDetails, // or bankLogin: bankLogin
								mandateText:
									`By clicking the aggrement 
									I  authorize Braintree, a service of
									 ACH, on behalf of  company SOFUMER
									  (i) to verify my bank account information using
									   bank information and consumer reports and (ii)
									   to debit my bank account.`
							},
							(tokenizeErr: any, tokenizedPayload: any) => {
								if (tokenizeErr) {
									console.log("check ur form", tokenizeErr);
									window.alert("the information you provided may not valid check account type inf")

									throw tokenizeErr;

								} else {
									console.log(tokenizedPayload.nonce);
									//call the second end point to get the nouce token
									this.sendBraintree({ noncetoken: tokenizedPayload.nonce, userdetail: bankDetails });
								}
							}
						);
					}
				);
			}
		);

		console.log(this.nounce);
	}

	clearform() {
		console.log("form value inside  clear function", this, this.myform.value)
		this.myform.reset()
	}

	sendBraintree(data: any) {
		this.counter = this.counter + 1
		this.service.createbraintreenonce(data).subscribe((result: any) => {
			console.log('data from serverby kas service:', result.id);
			this.transactioID = result.id;
			if (result.id !== undefined) {
				if (this.counter > 1) {
					console.log("second  time micro check");
					window.alert("no micro cehck requeried")
					this.router.navigate(['/print']);
				}
				else {
					this.router.navigate(['/microchecking']);
				}
			} else {
				window.alert('please check provided infomation ');
			}
		});

	}
}
