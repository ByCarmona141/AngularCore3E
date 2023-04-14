import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../../services/validators.service';
import { systemUserService } from '../../service/system-user.service';
import { systemUserStatusService } from '../../../system-user-status/service/system-user-status.service';
import { systemRoleService } from '../../../system-role/service/system-role.service';
import { systemUser } from '../../interface/system-user';
import { systemUserDataForm } from '../../interface/system-user-data-form';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-system-user-update',
  templateUrl: './system-user-update.component.html',
  styles: []
})

export class systemUserUpdateComponent extends systemUserDataForm implements OnInit {
  form: FormGroup;
  loading = true;
  register = false;
  @Input() modal = false;

  @Input()
  id: number;
  data: systemUser;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
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

    this.form.controls.user.setValue(this.data.user);
    this.form.controls.password.setValue(this.data.password);
    this.form.controls.email.setValue(this.data.email);
    this.form.controls.selfie.setValue(this.data.selfie);
    this.form.controls.tag.setValue(this.data.tag);
    this.form.controls.fullName.setValue(this.data.fullName);
    this.form.controls.address.setValue(this.data.address);
    this.form.controls.phone.setValue(this.data.phone);
    this.form.controls.area.setValue(this.data.area);
    this.form.controls.idSystemUserStatus.setValue(this.data.idSystemUserStatus);
    this.form.controls.idSystemRole.setValue(this.data.idSystemRole);
    this.form.controls.tries.setValue(this.data.tries);
    this.form.controls.position.setValue(this.data.position);
    this.form.controls.skype.setValue(this.data.skype);

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
    this.router.navigate([ '/systemUser' ]).then();
  }
}
