import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../../services/validators.service';
import { systemPrivilegesUserRoleDataForm } from "../../interface/system-privileges-user-role-data-form";
import { systemPrivilegesUserRoleService } from '../../service/system-privileges-user-role.service';
import { systemPrivilegesService } from '../../../system-privileges/service/system-privileges.service';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-system-privileges-user-role-create',
  templateUrl: './system-privileges-user-role-create.component.html',
  styles: []
})

export class systemPrivilegesUserRoleCreateComponent extends systemPrivilegesUserRoleDataForm implements OnInit {
  form: FormGroup;
  register = false;
  loading = true;
  @Input() modal = false;

  constructor(private router: Router,
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
    if (this.modal){
      this.activeModal.dismiss('cancel');
      return;
    }
    this.router.navigate(['/systemPrivilegesUserRole']).then();
  }
}
