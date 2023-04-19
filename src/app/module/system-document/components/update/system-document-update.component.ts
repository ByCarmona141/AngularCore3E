import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../../services/validators.service';
import { systemDocumentService } from '../../service/system-document.service';
import { systemTemplateService } from '../../../system-template/service/system-template.service';
import { systemDocument } from '../../interface/system-document';
import { systemDocumentDataForm } from "../../interface/system-document-data-form";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-system-document-update',
  templateUrl: './system-document-update.component.html',
  styles: []
})

export class systemDocumentUpdateComponent extends systemDocumentDataForm implements OnInit {
  form: FormGroup;
  loading = true;
  register = false;
  @Input() modal = false;

  @Input()
  id: number;
  data: systemDocument;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
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

    this.form.controls.idSystemTemplate.setValue(this.data.idSystemTemplate);
    this.form.controls.content.setValue(this.data.content);
    this.form.controls.dateCreate.setValue(this.data.dateCreate);

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
    this.router.navigate(['/systemDocument']).then();
  }
}
