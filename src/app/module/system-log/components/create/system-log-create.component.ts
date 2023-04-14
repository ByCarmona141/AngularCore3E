import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../../services/validators.service';
import { systemLogDataForm } from "../../interface/system-log-data-form";
import { systemLogService } from '../../service/system-log.service';
import { systemUserService } from '../../../system-user/service/system-user.service';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-system-log-create',
  templateUrl: './system-log-create.component.html',
  styles: []
})

export class systemLogCreateComponent extends systemLogDataForm implements OnInit {
  form: FormGroup;
  register = false;
  loading = true;
  @Input() modal = false;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private validators: ValidatorsService,
              private activeModal: NgbActiveModal,
              private service: systemLogService,
              private systemUserService: systemUserService) {
    super(systemUserService);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      table: [null, [Validators.minLength(1), Validators.maxLength(64)]],
      tuple: [null, [Validators.minLength(1), Validators.maxLength(64)]],
      date: [null, []],
      data: [null, [Validators.minLength(1), Validators.maxLength(65535)]],
      idSystemUser: [null, []],
      idSystemAction: [null, []],
      ipAddress: [null, [Validators.minLength(1), Validators.maxLength(32)]],
      agent: [null, [Validators.minLength(1), Validators.maxLength(256)]],
      form: [null, [Validators.minLength(1), Validators.maxLength(128)]]
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
    this.router.navigate(['/systemLog']).then();
  }
}
