import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { systemDocumentService } from '../../service/system-document.service';
import { systemPrivilegesService as CelaPrivilegiosService } from '../../../system-privileges/service/system-privileges.service';
import { TableComponent } from '../../../../components/shared/table/table.component';

@Component({
  selector: 'app-system-document',
  templateUrl: './system-document-read.component.html',
  styleUrls: []
})
export class systemDocumentReadComponent implements OnInit {
  disabled = true;
  serveSource = 'systemDocument';
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
    'id System Template',
    'content',
    'date Create',
    'PDF'
  ];

  @ViewChild('table') table: TableComponent;

  constructor(public auth: AuthService,
              private router: Router,
              private service: systemDocumentService,
              private privilegesService: CelaPrivilegiosService) {
    this.privilegesService.getPrivileges('systemDocument')
      .subscribe(data => {
        this.privilege = data;
      });
  }

  ngOnInit(): void {
  }

  update(id: number): void {
    this.router.navigateByUrl('/systemDocument/update/' + id);
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
            Swal.fire('Eliminado', 'El registro se elimino correctamente!', 'success');
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

  // Metodo para consumir el endpoint del reporte
  report(id: number): void {
    // Mandamos el id para el reporte
    this.service.report(id).subscribe(resp => {
          // Abrimos el pdf en otra ventana
          window.open('http://' + resp['hydra:member'][3] + 'public/' + resp['hydra:member'][1], '_blank');
        },
        error => {
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

    // Para el extracoluns de reporte
    if (classTag.includes('reporte')) {
      // Mandamos a traer el metodo para crear reporte
      this.report(input.attributes.index.value);
    }
  }
}
