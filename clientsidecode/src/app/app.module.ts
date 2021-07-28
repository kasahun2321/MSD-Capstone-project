import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ShowitemsComponent } from './components/showitems/showitems.component';
import { AboutComponent } from './components/about/about.component';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { ConfromMicrocheckformComponent } from './components/confrom-microcheckform/confrom-microcheckform.component';
import { NgxPrintModule } from 'ngx-print';
import { PrintrecieptComponent } from './components/printreciept/printreciept.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
let routes: Routes = [
	{ path: 'about', component: AboutComponent },
	{ path: 'form', component: FormComponent },
	{ path: 'items', component: ShowitemsComponent },
	{ path: 'print', component: PrintrecieptComponent },

	{ path: 'microchecking', component: ConfromMicrocheckformComponent }
];
@NgModule({
	declarations: [
		AppComponent,
		ShowitemsComponent,
		AboutComponent,
		FormComponent,
		ConfromMicrocheckformComponent,
		PrintrecieptComponent,
	],
	imports: [
		BrowserModule,
		ReactiveFormsModule,
		RouterModule.forRoot(routes),
		NgxPrintModule,
		HttpClientModule,
		MatCheckboxModule,
		MatDialogModule,
		MatDividerModule,
		MatButtonModule,
		MatCardModule
	],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
