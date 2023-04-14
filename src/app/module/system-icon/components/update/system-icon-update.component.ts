import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../../services/validators.service';
import { systemIconService } from '../../service/system-icon.service';
import { systemIcon } from '../../interface/system-icon';
import { systemIconDataForm } from "../../interface/system-icon-data-form";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-system-icon-update',
  templateUrl: './system-icon-update.component.html',
  styles: []
})

export class systemIconUpdateComponent extends systemIconDataForm implements OnInit {
  form: FormGroup;
  loading = true;
  register = false;
  @Input() modal = false;

  @Input()
  id: number;
  data: systemIcon;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private validators: ValidatorsService,
              private activeModal: NgbActiveModal,
              private service: systemIconService) {

    super();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, [Validators.minLength(1), Validators.maxLength(32)]]
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
    this.router.navigate(['/systemIcon']).then();
  }
}
