import { DataForm } from '../../../interfaces/data-form';
import { systemUserService } from '../../system-user/service/system-user.service';
import { systemUserCreateComponent } from '../../system-user/components/create/system-user-create.component';

export abstract class systemLogDataForm {

    table: DataForm = {
    field: 'table',
    type: 'text',
    label: 'Table',
    message: 'Ingrese minimo 1 letra y maximo 64'
  };
  tuple: DataForm = {
    field: 'tuple',
    type: 'text',
    label: 'Tuple',
    message: 'Ingrese minimo 1 letra y maximo 64'
  };
  date: DataForm = {
    field: 'date',
    type: 'datetime-local',
    label: 'Date',
    message: 'Ingrese una fecha'
  };
  dataForm: DataForm = {
    field: 'data',
    type: 'text',
    label: 'Data',
    message: 'Ingrese minimo 1 letra y maximo 65535'
  };
  idSystemUser: DataForm = {
    field: 'idSystemUser',
    type: 'select',
    label: 'Id System User',
    message: 'Ingrese un systemUser'
  };
  idSystemAction: DataForm = {
    field: 'idSystemAction',
    type: 'number',
    label: 'Id System Action',
    message: 'Ingrese un numero'
  };
  ipAddress: DataForm = {
    field: 'ipAddress',
    type: 'text',
    label: 'Ip Address',
    message: 'Ingrese minimo 1 letra y maximo 32'
  };
  agent: DataForm = {
    field: 'agent',
    type: 'text',
    label: 'Agent',
    message: 'Ingrese minimo 1 letra y maximo 256'
  };
  formForm: DataForm = {
    field: 'form',
    type: 'text',
    label: 'Form',
    message: 'Ingrese minimo 1 letra y maximo 128'
  };

    protected constructor(systemUserService: systemUserService) {
        this.idSystemUser.items = systemUserService.combo();
    this.idSystemUser.empty = true;
    this.idSystemUser.add = true;
    this.idSystemUser.component = systemUserCreateComponent;
    }

    abstract submit(values): void;

    abstract return(): void;
}
