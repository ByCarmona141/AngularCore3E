import { DataForm } from '../../../interfaces/data-form';
import { systemPrivilegesService } from '../../system-privileges/service/system-privileges.service';
import { systemPrivilegesCreateComponent } from '../../system-privileges/components/create/system-privileges-create.component';

export abstract class systemPrivilegesUserRoleDataForm {

    idSystemPrivileges: DataForm = {
    field: 'idSystemPrivileges',
    type: 'select',
    label: 'Id System Privileges',
    message: 'Ingrese un systemPrivileges'
  };
  objectSource: DataForm = {
    field: 'objectSource',
    type: 'text',
    label: 'Object Source',
    message: 'Ingrese minimo 1 letra y maximo 32'
  };
  objectTupla: DataForm = {
    field: 'objectTupla',
    type: 'number',
    label: 'Object Tupla',
    message: 'Ingrese un numero'
  };
  active: DataForm = {
    field: 'active',
    type: 'number',
    label: 'Active',
    message: 'Ingrese un numero'
  };
  objetcAccess: DataForm = {
    field: 'objetcAccess',
    type: 'number',
    label: 'Objetc Access',
    message: 'Ingrese un numero'
  };

    protected constructor(systemPrivilegesService: systemPrivilegesService) {
        this.idSystemPrivileges.items = systemPrivilegesService.combo();
    this.idSystemPrivileges.empty = true;
    this.idSystemPrivileges.add = true;
    this.idSystemPrivileges.component = systemPrivilegesCreateComponent;
    }

    abstract submit(values): void;

    abstract return(): void;
}
