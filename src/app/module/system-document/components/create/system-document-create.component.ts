import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../../services/validators.service';
import { systemDocumentDataForm } from "../../interface/system-document-data-form";
import { systemDocumentService } from '../../service/system-document.service';
import { systemTemplateService } from '../../../system-template/service/system-template.service';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-system-document-create',
  templateUrl: './system-document-create.component.html',
  styles: []
})

export class systemDocumentCreateComponent extends systemDocumentDataForm implements OnInit {
  form: FormGroup;
  register = false;
  loading = true;
  @Input() modal = false;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private validators: ValidatorsService,
              private activeModal: NgbActiveModal,
              private service: systemDocumentService,
              private systemTemplateService: systemTemplateService) {
    super(systemTemplateService);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      idSystemTemplate: [null, []],
      content: [null, [Validators.minLength(1), Validators.maxLength(4294967295)]],
      dateCreate: [null, []]
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
    this.router.navigate(['/systemDocument']).then();
  }
}
