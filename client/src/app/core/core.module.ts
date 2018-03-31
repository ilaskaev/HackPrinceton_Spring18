import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule, MatIconModule, MatMenuModule, MatProgressBarModule, MatToolbarModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {NavComponent} from './nav/nav.component';


@NgModule({
  imports: [
    CommonModule, BrowserAnimationsModule, MatToolbarModule, MatButtonModule,
    MatProgressBarModule, MatMenuModule, MatIconModule
  ],
  declarations: [NavComponent],
  exports: [NavComponent]
})
export class CoreModule {
}
