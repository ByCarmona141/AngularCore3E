import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../../services/validators.service';
import { systemTemplateFrontPageService } from '../../service/system-template-front-page.service';
import { systemOrientationService } from '../../../system-orientation/service/system-orientation.service';
import { systemSizeService } from '../../../system-size/service/system-size.service';
import { systemTemplateFrontPage } from '../../interface/system-template-front-page';
import { systemTemplateFrontPageDataForm } from "../../interface/system-template-front-page-data-form";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-system-template-front-page-update',
  templateUrl: './system-template-front-page-update.component.html',
  styles: []
})

export class systemTemplateFrontPageUpdateComponent extends systemTemplateFrontPageDataForm implements OnInit {
  form: FormGroup;
  loading = true;
  register = false;
  @Input() modal = false;

  @Input() id: number;
  data: systemTemplateFrontPage;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private validators: ValidatorsService,
              private activeModal: NgbActiveModal,
              private service: systemTemplateFrontPageService,
              private systemOrientationService: systemOrientationService,
              private systemSizeService: systemSizeService) {

    super(systemOrientationService,
              systemSizeService);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, [Validators.minLength(1), Validators.maxLength(32)]],
      header: [null, [Validators.minLength(1), Validators.maxLength(4294967295)]],
      body: [null, [Validators.minLength(1), Validators.maxLength(4294967295)]],
      footer: [null, [Validators.minLength(1), Validators.maxLength(4294967295)]],
      idSystemOrientation: [null, [Validators.required]],
      idSystemSize: [null, [Validators.required]],
      headerSpacing: [null, []],
      footerSpacing: [null, []],
      marginLeft: [null, []],
      marginRight: [null, []],
      marginTop: [null, []],
      marginBottom: [null, []]
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
    this.form.controls.header.setValue(this.data.header);
    this.form.controls.body.setValue(this.data.body);
    this.form.controls.footer.setValue(this.data.footer);
    this.form.controls.idSystemOrientation.setValue(this.data.idSystemOrientation);
    this.form.controls.idSystemSize.setValue(this.data.idSystemSize);
    this.form.controls.headerSpacing.setValue(this.data.headerSpacing);
    this.form.controls.footerSpacing.setValue(this.data.footerSpacing);
    this.form.controls.marginLeft.setValue(this.data.marginLeft);
    this.form.controls.marginRight.setValue(this.data.marginRight);
    this.form.controls.marginTop.setValue(this.data.marginTop);
    this.form.controls.marginBottom.setValue(this.data.marginBottom);

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
    this.router.navigate(['/systemTemplateFrontPage']).then();
  }
}
