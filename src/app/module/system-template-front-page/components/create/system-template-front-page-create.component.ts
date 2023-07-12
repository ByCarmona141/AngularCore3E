import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../../services/validators.service';
import { systemTemplateFrontPageDataForm } from "../../interface/system-template-front-page-data-form";
import { systemTemplateFrontPageService } from '../../service/system-template-front-page.service';
import { systemOrientationService } from '../../../system-orientation/service/system-orientation.service';
import { systemSizeService } from '../../../system-size/service/system-size.service';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-system-template-front-page-create',
  templateUrl: './system-template-front-page-create.component.html',
  styles: []
})

export class systemTemplateFrontPageCreateComponent extends systemTemplateFrontPageDataForm implements OnInit {
  form: FormGroup;
  register = false;
  loading = true;
  @Input() modal = false;

  constructor(private router: Router,
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
      headerSpacing: [11, []],
      footerSpacing: [4, []],
      marginLeft: [0, []],
      marginRight: [0, []],
      marginTop: [0, []],
      marginBottom: [0, []]
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
    this.router.navigate(['/systemTemplateFrontPage']).then();
  }
}
