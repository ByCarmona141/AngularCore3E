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
  actual: any = new Date();
  zonaHoraria: any = '';
  keys: any[] = [];

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private validators: ValidatorsService,
              private activeModal: NgbActiveModal,
              private service: systemDocumentService,
              private systemTemplateService: systemTemplateService) {
    super(systemTemplateService);
  }

  ngOnInit(): void {
    // Obtenemos la zona horaria
    this.zonaHoraria = Intl.DateTimeFormat().resolvedOptions();

    // Establecemos la zona horaria
    this.actual.timezone = this.zonaHoraria.timeZone;

    // Formato de Fecha 2010-12-28T14:57:00
    this.actual = this.actual.toISOString();
    this.actual = this.actual.substring(0, this.actual.length - 5);

    this.form = this.formBuilder.group({
      idSystemTemplate: [null, [Validators.required]],
      content: [null, [Validators.minLength(1), Validators.maxLength(4294967295)]],
      dateCreate: [this.actual, [Validators.required]]
    });

    // Si el select cambia de seleccion
    this.form.get('idSystemTemplate').valueChanges.subscribe(value => {
      // Limpiamos el arreglo
      this.keys = [];
      // Recorremos el json
      this.systemTemplateService.json(value).subscribe(resp => {
        // Recorremos la respuesta con el json
        resp['hydra:member'].forEach(key => {
          // Guardamos en un arreglo los objetos
          this.keys.push(key);
        });
      });
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
