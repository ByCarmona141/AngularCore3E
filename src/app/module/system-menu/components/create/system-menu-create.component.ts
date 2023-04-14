import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../../services/validators.service';
import { systemMenuDataForm } from '../../interface/system-menu-data-form';
import { systemMenuService } from '../../service/system-menu.service';
import { systemIconService } from '../../../system-icon/service/system-icon.service';
import { systemRoleService } from '../../../system-role/service/system-role.service';
import { systemTypeElementService } from '../../../system-type-element/service/system-type-element.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';


@Component({
    selector: 'app-system-menu-create',
    templateUrl: './system-menu-create.component.html',
    styles: []
})

export class systemMenuCreateComponent extends systemMenuDataForm implements OnInit {
    form: FormGroup;
    register = false;
    loading = true;
    @Input() modal = false;

    constructor(private router: Router,
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

        this.loading = false;
    }

    submit(values): void {
        this.register = true;
        if (this.form.valid) {
            this.service.create(values)
                .subscribe(resp => {
                    if (this.modal) {
                        let id = resp['@id'].split('/');
                        id = parseInt(id[id.length - 1]);
                        this.activeModal.close(id);
                        return;
                    }
                    this.return();
                    this.register = false;
                }, error => {
                    Swal.fire({
                        title: 'Error',
                        type: 'error',
                        text: 'Ocurrió un error' + error.message
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
