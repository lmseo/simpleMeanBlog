import { NgModule } from "@angular/core";
import {
  MatButtonModule,
  MatCardModule,
  MatExpansionModule,
  MatInputModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatToolbarModule
} from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  imports: [
    MatMenuModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    FlexLayoutModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatMenuModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ]
})
export class MaterialModule {}
