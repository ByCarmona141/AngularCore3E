import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../../services/validators.service';
import { systemTemplateService } from '../../service/system-template.service';
import { systemOrientationService } from '../../../system-orientation/service/system-orientation.service';
import { systemSizeService } from '../../../system-size/service/system-size.service';
import { systemTemplate } from '../../interface/system-template';
import { systemTemplateDataForm } from "../../interface/system-template-data-form";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-system-template-update',
  templateUrl: './system-template-update.component.html',
  styles: []
})

export class systemTemplateUpdateComponent extends systemTemplateDataForm implements OnInit {
  form: FormGroup;
  loading = true;
  register = false;
  @Input() modal = false;

  @Input() id: number;
  data: systemTemplate;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private validators: ValidatorsService,
              private activeModal: NgbActiveModal,
              private service: systemTemplateService,
              private systemOrientationService: systemOrientationService,
              private systemSizeService: systemSizeService) {

    super(systemOrientationService,
              systemSizeService);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, [Validators.minLength(1), Validators.maxLength(32)]],
      json: [null, [Validators.minLength(1), Validators.maxLength(4294967295)]],
      header: [null, [Validators.minLength(1), Validators.maxLength(4294967295)]],
      body: [null, [Validators.minLength(1), Validators.maxLength(4294967295)]],
      footer: [null, [Validators.minLength(1), Validators.maxLength(4294967295)]],
      orientation: [null, [Validators.required]],
      size: [null, [Validators.required]],
      headerSpacing: [null, []],
      footerSpacing: [null, []],
      frontPage: [null, [Validators.minLength(1), Validators.maxLength(4294967295)]],
      marginLeft: [null, []],
      marginRight: [null, []],
      marginTop: [null, []],
      marginBottom: [null, []],
      script: [null, [Validators.minLength(1), Validators.maxLength(65535)]]
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
    this.form.controls.json.setValue(this.data.json);
    this.form.controls.header.setValue(this.data.header);
    this.form.controls.body.setValue(this.data.body);
    this.form.controls.footer.setValue(this.data.footer);
    this.form.controls.orientation.setValue(this.data.orientation);
    this.form.controls.size.setValue(this.data.size);
    this.form.controls.headerSpacing.setValue(this.data.headerSpacing);
    this.form.controls.footerSpacing.setValue(this.data.footerSpacing);
    this.form.controls.frontPage.setValue(this.data.frontPage);
    this.form.controls.marginLeft.setValue(this.data.marginLeft);
    this.form.controls.marginRight.setValue(this.data.marginRight);
    this.form.controls.marginTop.setValue(this.data.marginTop);
    this.form.controls.marginBottom.setValue(this.data.marginBottom);
    this.form.controls.script.setValue(this.data.script);

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
    this.router.navigate(['/systemTemplate']).then();
  }
}
