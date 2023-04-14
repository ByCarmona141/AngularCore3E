import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../../services/validators.service';
import { systemLogService } from '../../service/system-log.service';
import { systemUserService } from '../../../system-user/service/system-user.service';
import { systemLog } from '../../interface/system-log';
import { systemLogDataForm } from "../../interface/system-log-data-form";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-system-log-update',
  templateUrl: './system-log-update.component.html',
  styles: []
})

export class systemLogUpdateComponent extends systemLogDataForm implements OnInit {
  form: FormGroup;
  loading = true;
  register = false;
  @Input() modal = false;

  @Input()
  id: number;
  data: systemLog;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
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

    this.form.controls.table.setValue(this.data.table);
    this.form.controls.tuple.setValue(this.data.tuple);
    this.form.controls.date.setValue(this.data.date);
    this.form.controls.data.setValue(this.data.data);
    this.form.controls.idSystemUser.setValue(this.data.idSystemUser);
    this.form.controls.idSystemAction.setValue(this.data.idSystemAction);
    this.form.controls.ipAddress.setValue(this.data.ipAddress);
    this.form.controls.agent.setValue(this.data.agent);
    this.form.controls.form.setValue(this.data.form);

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
    this.router.navigate(['/systemLog']).then();
  }
}
