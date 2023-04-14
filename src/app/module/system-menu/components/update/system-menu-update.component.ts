import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../../services/validators.service';
import { systemMenuService } from '../../service/system-menu.service';
import { systemIconService } from '../../../system-icon/service/system-icon.service';
import { systemTypeElementService } from '../../../system-type-element/service/system-type-element.service';
import { systemRoleService } from '../../../system-role/service/system-role.service';
import { systemMenu } from '../../interface/system-menu';
import { systemMenuDataForm } from '../../interface/system-menu-data-form';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-system-menu-update',
    templateUrl: './system-menu-update.component.html',
    styles: []
})

export class systemMenuUpdateComponent extends systemMenuDataForm implements OnInit {
    form: FormGroup;
    loading = true;
    register = false;
    @Input() modal = false;

    @Input()
    id: number;
    data: systemMenu;

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private formBuilder: FormBuilder,
                private validators: ValidatorsService,
                private activeModal: NgbActiveModal,
                private service: systemMenuService,
                private systemIconService: systemIconService,
                private systemTypeElementService: systemTypeElementService,
                private systemRoleService: systemRoleService) {

        super(service,
            systemIconService,
            systemTypeElementService,
            systemRoleService);
    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            name: [null, [Validators.minLength(1), Validators.maxLength(32)]],
            description: [null, [Validators.minLength(1), Validators.maxLength(64)]],
            href: [null, [Validators.minLength(1), Validators.maxLength(256)]],
            idSystemIcon: [null, []],
            category: [null, []],
            priority: [null, []],
            idSystemTypeElement: [null, []],
            roles: [null, []]
        });

        if (typeof this.id !== 'undefined') {
            this.service.data(this.id).subscribe(data => this.initForm(data),
                () => this.return);
        } else {
            this.activatedRoute.params.subscribe(params => {
                this.id = params.id;
                this.service.data(this.id).subscribe(data => this.initForm(data),
                    () => this.return);
            });
        }
    }

    initForm(data): void {
        this.data = data;

        this.form.controls.name.setValue(this.data.name);
        this.form.controls.description.setValue(this.data.description);
        this.form.controls.href.setValue(this.data.href);
        this.form.controls.idSystemIcon.setValue(this.data.idSystemIcon);
        this.form.controls.category.setValue(this.data.category);
        this.form.controls.priority.setValue(this.data.priority);
        this.form.controls.idSystemTypeElement.setValue(this.data.idSystemTypeElement);

        this.loading = false;
    }

    submit(values): void {
        this.register = true;
        if (this.form.valid) {
            this.service.update(values, this.id)
                .subscribe(() => {
                    if (this.modal) {
                        this.activeModal.close(this.id);
                    }
                    this.return();
                    this.register = false;
                }, error => {
                    Swal.fire({
                        title: 'Error',
                        type: 'error',
                        text: 'Ocurrió un error'
                    }).then(() => {
                        console.log(error);
                        this.register = false;
                    });
                });
        } else {
            this.form.markAllAsTouched();
            this.register = false;
        }
    }

    return(): void {
        if (this.modal) {
            this.activeModal.dismiss('cancel');
            return;
        }
        this.router.navigate(['/systemMenu']).then();
    }
}
