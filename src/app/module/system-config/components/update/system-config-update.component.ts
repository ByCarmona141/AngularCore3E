import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../../services/validators.service';
import { systemConfigService } from '../../service/system-config.service';
import { systemConfig } from '../../interface/system-config';
import { systemConfigDataForm } from "../../interface/system-config-data-form";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-system-config-update',
  templateUrl: './system-config-update.component.html',
  styles: []
})

export class systemConfigUpdateComponent extends systemConfigDataForm implements OnInit {
  form: FormGroup;
  loading = true;
  register = false;
  @Input() modal = false;

  @Input()
  id: number;
  data: systemConfig;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private validators: ValidatorsService,
              private activeModal: NgbActiveModal,
              private service: systemConfigService) {

    super();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, [Validators.minLength(1), Validators.maxLength(64)]],
          value: [null, [Validators.minLength(1), Validators.maxLength(32)]],
          tipeofHTML: [null, [Validators.minLength(1), Validators.maxLength(16)]],
          category: [null, []],
          configKey: [null, [Validators.minLength(1), Validators.maxLength(32), Validators.required]]
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

    this.form.controls.name.setValue(this.data.name);
    this.form.controls.value.setValue(this.data.value);
    this.form.controls.tipeofHTML.setValue(this.data.tipeofHTML);
    this.form.controls.category.setValue(this.data.category);
    this.form.controls.configKey.setValue(this.data.configKey);

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
    this.router.navigate(['/systemConfig']).then();
  }
}
