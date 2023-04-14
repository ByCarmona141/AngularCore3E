import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../../services/validators.service';
import { systemUserDataForm } from '../../interface/system-user-data-form';
import { systemUserService } from '../../service/system-user.service';
import { systemUserStatusService } from '../../../system-user-status/service/system-user-status.service';
import { systemRoleService } from '../../../system-role/service/system-role.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-system-user-create',
  templateUrl: './system-user-create.component.html',
  styles: []
})

export class systemUserCreateComponent extends systemUserDataForm implements OnInit {
  form: FormGroup;
  register = false;
  loading = true;
  @Input() modal = false;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private validators: ValidatorsService,
              private activeModal: NgbActiveModal,
              private service: systemUserService,
              private systemUserStatusService: systemUserStatusService,
              private systemRoleService: systemRoleService) {
    super(systemUserStatusService,
      systemRoleService);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      user: [ null, [ Validators.minLength(1), Validators.maxLength(32) ] ],
      password: [ null, [ Validators.minLength(1), Validators.maxLength(32) ] ],
      email: [ null, [ Validators.minLength(1), Validators.maxLength(64) ] ],
      selfie: [ null, [ Validators.minLength(1), Validators.maxLength(256) ] ],
      tag: [ null, [ Validators.minLength(1), Validators.maxLength(16) ] ],
      fullName: [ null, [ Validators.minLength(1), Validators.maxLength(256) ] ],
      address: [ null, [ Validators.minLength(1), Validators.maxLength(256) ] ],
      phone: [ null, [ Validators.minLength(1), Validators.maxLength(32) ] ],
      area: [ null, [] ],
      idSystemUserStatus: [ null, [] ],
      idSystemRole: [ null, [] ],
      tries: [ null, [] ],
      position: [ null, [ Validators.minLength(1), Validators.maxLength(64) ] ],
      skype: [ null, [ Validators.minLength(1), Validators.maxLength(64) ] ]
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
    this.router.navigate([ '/systemUser' ]).then();
  }
}
