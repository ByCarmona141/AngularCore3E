import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { systemTemplateFrontPageService } from '../../service/system-template-front-page.service';
import { systemPrivilegesService as CelaPrivilegiosService } from '../../../system-privileges/service/system-privileges.service';
import { TableComponent } from '../../../../components/shared/table/table.component';

@Component({
  selector: 'app-system-template-front-page',
  templateUrl: './system-template-front-page-read.component.html',
  styleUrls: []
})
export class systemTemplateFrontPageReadComponent implements OnInit {
  disabled = true;
  serveSource = 'systemTemplateFrontPage';
  serverFunction = 'readDataTable';
  selected = [];
  privilege = {
    create: false,
    update: false,
    delete: false
  };
  params = {
  };

  fields = [
    '#',
    'name',
    'header',
    'body',
    'footer',
    'orientation',
    'size',
    'header Spacing',
    'footer Spacing',
    'report'
  ];

  @ViewChild('table') table: TableComponent;

  constructor(public auth: AuthService,
              private router: Router,
              private service: systemTemplateFrontPageService,
              private privilegesService: CelaPrivilegiosService) {
    this.privilegesService.getPrivileges('systemTemplateFrontPage')
      .subscribe(data => {
        this.privilege = data;
      });
  }

  ngOnInit(): void {
  }

  update(id: number): void {
    this.router.navigateByUrl('/systemTemplateFrontPage/update/' + id);
  }

  delete(id: number): void {
    Swal.fire({
      title: `¿Estas seguro de eliminar el registro ${id}?`,
      type: 'warning',
      showCloseButton: true,
      showCancelButton: true
    }).then((result) => {
      if (!result.dismiss) {
        this.service.delete(id).subscribe(resp => {
            Swal.fire('Eliminado', 'El registro se elimino correctamente!', 'error');
            this.table.refreshTable();
          },
          error => {
            Swal.fire(
              'ERROR!',
              'Hubo un error al eliminar, intente de nuevo',
              'error'
            );
          });
      }
    });
  }

  report(id: number): void {
    // Mandamos el id para el reporte
    this.service.report(id).subscribe(resp => {
      console.log(id);
      console.log(resp);

      // Abrimos el pdf en otra ventana
      window.open('http://' + resp['hydra:member'][3] + 'public/' + resp['hydra:member'][1], '_blank');
    }, error => {
      // Si hay un error indicamos que hubo un error con un modal
      Swal.fire(
          'ERROR!',
          'Hubo un error al generar el reporte, intente de nuevo',
          'error'
      );
    });
  }

  @HostListener('click', ['$event'])
  onClick(ev): void {
    let input = ev.target;
    if (input.tagName !== 'A') {
      input = input.parentNode;
    }

    const classTag = input.className;

    if (classTag.includes('edit')) {
      this.update(input.attributes.index.value);
    }

    if (classTag.includes('delete')) {
      this.delete(input.attributes.index.value);
    }

    if (classTag.includes('report')) {
      this.report(input.attributes.index.value);
    }
  }
}
