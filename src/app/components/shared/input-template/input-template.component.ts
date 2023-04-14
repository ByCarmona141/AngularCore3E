import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-input-template',
    templateUrl: './input-template.component.html',
    styleUrls: ['./input-template.component.css']
})
export class InputTemplateComponent implements OnInit {
    @Input() form: FormGroup;
    @Input() data: any;
    options = [];
    emptyMessage = 'SELECCIONE UNA OPCION';
    multiple = false;
    readonly = false;
    add = false;

    constructor(private modalService: NgbModal) {
    }

    update(): void {
        if (this.data.readonly) {
            this.readonly = this.data.readonly;
        }

        if (this.data.type === 'select') {
            this.data.items.subscribe(resp => {
                this.options = resp;
            });

            if (this.data.emptyMessage) {
                this.emptyMessage = this.data.emptyMessage;
            }

            if (this.data.multiple) {
                this.multiple = this.data.multiple;
            }

            if(this.data.add){
                this.add = this.data.add;
            }
        }
    }

    ngOnInit(): void {
        this.update();
    }

    noValid(field: string): boolean {
        return this.form.get(field).invalid && this.form.get(field).touched;
    }

    valid(field: string): boolean {
        return this.form.get(field).valid && this.form.get(field).touched;
    }

    isRequired(field: string): boolean {
        return this.form.get(field).errors != null;
    }

    onFileChange(event): void {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.form.get(this.data.field).setValue(file);
        }
        /*const file = (event.target as HTMLInputElement).files[0];

        const control = {};
        control[this.data.field] = file;

        this.form.patchValue(
            control
        );
        this.form.get(this.data.field).updateValueAndValidity();*/
    }

    openModal(): void {
        const modal = this.modalService.open(this.data.component, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'lg',
            backdrop: 'static'
        });
        modal.componentInstance.modal = true;

        modal.result
            .then((id) => {
                this.update();
                this.form.get(this.data.field).setValue(id);
            }).catch(() => true);
    }
}
