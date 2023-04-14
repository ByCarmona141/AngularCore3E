import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { API_URL, systemName } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit, OnDestroy {

  dtOptions: DataTables.Settings = {};

  @Input() serveSource: string;
  @Input() serveFunction: string;
  @Input() params: any;
  @Input() fields: any;

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  // @ts-ignore
  dtTrigger: Subject = new Subject();

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    const that = this;
    const headers = new HttpHeaders({
      Authorization: localStorage.getItem(systemName + 'Token')
    });


    this.dtOptions = {
      dom: '<"row"<"col-md-12"f>><t>ip',
      pagingType: 'full_numbers',
      scrollX: true,
      processing: true,
      serverSide: true,
      pageLength: 20,
      stateSave: true,
      language: {
        zeroRecords: 'No se encontraron registros',
        info: 'Mostrando de _START_ a _END_ de _TOTAL_ registros',
        infoEmpty: 'Mostrando 0 a 0 de 0 registros',
        infoFiltered: 'Filtrando de _MAX_ registros totales',
        search: 'Buscar',
        lengthMenu: 'Mostrar _MENU_ registros ',
        // @ts-ignore
        paginate: {
          first: '1&ordf; Pag.',
          previous: 'Anterior',
          next: 'Siguiente',
          last: 'Ultima'
        },
      },
      ajax: (dataTablesParameters: any, callback) => {
        that.http
          .post<any>(
            API_URL + 'api/' + this.serveSource + '/' + this.serveFunction,
            {
              dataTablesParameters,
              params: that.params
            }, { headers }
          ).subscribe(resp => {
          callback({
            draw: resp.draw,
            recordsTotal: resp.recordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data: resp.data
          });
        });
      }
    };
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  refreshTable(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

}

$(document).delegate('.datatableRow', 'mouseover', function(){
  let id = $(this).attr('id');
  $('#actions_' + id).show();
});

$(document).delegate('.datatableRow', 'mouseleave', function(){
  let id = $(this).attr('id');
  $('#actions_' + id).hide();
});
