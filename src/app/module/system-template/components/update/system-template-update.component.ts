import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../../services/validators.service';
import { systemTemplateService } from '../../service/system-template.service';
import { systemOrientationService } from '../../../system-orientation/service/system-orientation.service';
import { systemSizeService } from '../../../system-size/service/system-size.service';
import { systemTemplateFrontPageService } from "../../../system-template-front-page/service/system-template-front-page.service";
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
              private systemSizeService: systemSizeService,
              private systemTemplateFrontPageService: systemTemplateFrontPageService) {

    super(systemOrientationService, systemSizeService, systemTemplateFrontPageService);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, [Validators.minLength(1), Validators.maxLength(32)]],
      json: [null, [Validators.minLength(1), Validators.maxLength(4294967295)]],
      header: [null, [Validators.minLength(1), Validators.maxLength(4294967295)]],
      body: [null, [Validators.minLength(1), Validators.maxLength(4294967295)]],
      footer: [null, [Validators.minLength(1), Validators.maxLength(4294967295)]],
      idSystemOrientation: [null, [Validators.required]],
      idSystemSize: [null, [Validators.required]],
      headerSpacing: [null, []],
      footerSpacing: [null, []],
      idSystemFrontPage: [null, [Validators.minLength(1), Validators.maxLength(4294967295)]],
      marginLeft: [null, []],
      marginRight: [null, []],
      marginTop: [null, []],
      marginBottom: [null, []],
      script: [null, [Validators.minLength(1), Validators.maxLength(65535)]],
      paginate: [null, [Validators.required]]
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
    this.form.controls.idSystemOrientation.setValue(this.data.idSystemOrientation);
    this.form.controls.idSystemSize.setValue(this.data.idSystemSize);
    this.form.controls.headerSpacing.setValue(this.data.headerSpacing);
    this.form.controls.footerSpacing.setValue(this.data.footerSpacing);
    this.form.controls.idSystemFrontPage.setValue(this.data.idSystemFrontPage);
    this.form.controls.marginLeft.setValue(this.data.marginLeft);
    this.form.controls.marginRight.setValue(this.data.marginRight);
    this.form.controls.marginTop.setValue(this.data.marginTop);
    this.form.controls.marginBottom.setValue(this.data.marginBottom);
    this.form.controls.script.setValue(this.data.script);
    this.form.controls.paginate.setValue(this.data.paginate);

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
