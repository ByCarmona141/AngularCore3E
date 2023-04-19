import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { systemPrivilegesUserRoleService } from '../../service/system-privileges-user-role.service';
import { systemPrivilegesService } from '../../../system-privileges/service/system-privileges.service';
import { TableComponent } from '../../../../components/shared/table/table.component';

@Component({
  selector: 'app-system-privileges-user-role',
  templateUrl: './system-privileges-user-role-read.component.html',
  styleUrls: []
})
export class systemPrivilegesUserRoleReadComponent implements OnInit {
  disabled = true;
  serveSource = 'systemPrivilegesUserRole';
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
    'id System Privileges',
    'object Source',
    'object Tupla',
    'active',
    'objetc Access'
  ];

  @ViewChild('table') table: TableComponent;

  constructor(public auth: AuthService,
              private router: Router,
              private service: systemPrivilegesUserRoleService,
              private privilegesService: systemPrivilegesService) {
    this.privilegesService.getPrivileges('systemPrivilegesUserRole')
      .subscribe(data => {
        this.privilege = data;
      });
  }

  ngOnInit(): void {
  }

  update(id: number): void {
    this.router.navigateByUrl('/systemPrivilegesUserRole/update/' + id);
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
  }
}
