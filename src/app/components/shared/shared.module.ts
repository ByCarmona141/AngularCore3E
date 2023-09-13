import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { DataTablesModule } from 'angular-datatables';
import { InputTemplateComponent } from './input-template/input-template.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { DomseguroPipe } from './pipes/domseguro.pipe';
import { NgSelectModule } from '@ng-select/ng-select';
import { TinymceModule } from 'angular2-tinymce';
import { ActionButtonsComponent } from './action-buttons/action-buttons.component';
import { CreateTemplateComponent } from './create-template/create-template.component';
import {InputJsonComponent} from "./input-json/input-json.component";

@NgModule({
    declarations: [TableComponent, InputTemplateComponent, InputJsonComponent, DomseguroPipe, ActionButtonsComponent, CreateTemplateComponent],
    imports: [
        CommonModule,
        DataTablesModule,
        ReactiveFormsModule,
        NgbDatepickerModule,
        NgSelectModule,
        TinymceModule,
    ],
    exports: [
        TableComponent,
        InputTemplateComponent,
        InputJsonComponent,
        DomseguroPipe,
        NgSelectModule,
        ActionButtonsComponent,
        CreateTemplateComponent
    ]
})
export class SharedModule {
}
