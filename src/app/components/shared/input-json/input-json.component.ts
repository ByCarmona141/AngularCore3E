import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-input-json',
    templateUrl: './input-json.component.html',
    styleUrls: ['./input-json.component.css']
})
export class InputJsonComponent implements OnInit {
    @Input() form: FormGroup;
    @Input() data: any;
    options = [];
    emptyMessage = 'SELECCIONE UNA OPCION';
    multiple = false;
    readonly = false;

    // Para el textarea
    cols = 5;
    rows = 5;

    constructor(private modalService: NgbModal) {
    }

    update(): void {
        if (this.data.readonly) {
            this.readonly = this.data.readonly;
        }

        // if (this.data.type === 'select') {
        //     this.data.items.subscribe(resp => {
        //         this.options = resp;
        //     });
        //
        //     if (this.data.emptyMessage) {
        //         this.emptyMessage = this.data.emptyMessage;
        //     }
        //
        //     if (this.data.multiple) {
        //         this.multiple = this.data.multiple;
        //     }
        // }

        // Si el componente es un textarea
        if (this.data.type === 'textarea') {
            if (this.data.cols) {
                this.cols = this.data.cols;
            }

            if (this.data.rows) {
                this.rows = this.data.rows;
            }
        }
    }

    ngOnInit(): void {
        this.update();
    }

    noValid(field: string): boolean {
        // return this.form.get(field).invalid && this.form.get(field).touched;
        return true;
    }

    valid(field: string): boolean {
        // return this.form.get(field).valid && this.form.get(field).touched;
        return true;
    }

    isRequired(field: string): boolean {
        // return this.form.get(field).errors != null;
        return true;
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
