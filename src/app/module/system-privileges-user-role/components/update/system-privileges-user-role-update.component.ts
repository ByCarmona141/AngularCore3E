import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../../services/validators.service';
import { systemPrivilegesUserRoleService } from '../../service/system-privileges-user-role.service';
import { systemPrivilegesService } from '../../../system-privileges/service/system-privileges.service';
import { systemPrivilegesUserRole } from '../../interface/system-privileges-user-role';
import { systemPrivilegesUserRoleDataForm } from "../../interface/system-privileges-user-role-data-form";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-system-privileges-user-role-update',
  templateUrl: './system-privileges-user-role-update.component.html',
  styles: []
})

export class systemPrivilegesUserRoleUpdateComponent extends systemPrivilegesUserRoleDataForm implements OnInit {
  form: FormGroup;
  loading = true;
  register = false;
  @Input() modal = false;

  @Input()
  id: number;
  data: systemPrivilegesUserRole;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private validators: ValidatorsService,
              private activeModal: NgbActiveModal,
              private service: systemPrivilegesUserRoleService,
              private systemPrivilegesService: systemPrivilegesService) {

    super(systemPrivilegesService);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      idSystemPrivileges: [null, []],
          objectSource: [null, [Validators.minLength(1), Validators.maxLength(32)]],
          objectTupla: [null, []],
          active: [null, []],
          objetcAccess: [null, []]
    });

    if (typeof this.id !== "undefined") {
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

    this.form.controls.idSystemPrivileges.setValue(this.data.idSystemPrivileges);
    this.form.controls.objectSource.setValue(this.data.objectSource);
    this.form.controls.objectTupla.setValue(this.data.objectTupla);
    this.form.controls.active.setValue(this.data.active);
    this.form.controls.objetcAccess.setValue(this.data.objetcAccess);

    this.loading = false;
  }

  submit(values): void {
    this.register = true;
    if (this.form.valid) {
      this.service.update(values, this.id)
        .subscribe(() => {
          if (this.modal){
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
    if (this.modal){
      this.activeModal.dismiss('cancel');
      return;
    }
    this.router.navigate(['/systemPrivilegesUserRole']).then();
  }
}
