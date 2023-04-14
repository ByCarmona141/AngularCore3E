import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-create-template',
    templateUrl: './create-template.component.html',
    styleUrls: ['./create-template.component.scss']
})
export class CreateTemplateComponent implements OnInit {

    @Input() create = true;
    @Input() id: number;
    @Input() title = '';
    @Input() loading = true;
    @Input() form: FormGroup;
    @Input() enter: true;
    @Input() register = false;
    @Input() modal = false;
    @Output() submit = new EventEmitter<{}>();
    @Output() cancel = new EventEmitter<void>();

    constructor() {
    }

    ngOnInit(): void {
    }

    submitEvent(): void {
        const data = {};
        for (const item of Object.entries(this.form.value)) {
            const [key, value] = item;
            data[key] = value === null || value === '' ? null : isNaN(Number(value)) ? value : Number(value);
        }
        this.submit.emit(data);
    }

    submitWithEnterEvent(): void {
        if (this.enter) {
            this.submitEvent();
        }
    }

    cancelEvent(): void {
        this.cancel.emit();
    }
}
