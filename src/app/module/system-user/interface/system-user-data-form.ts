import { DataForm } from '../../../interfaces/data-form';
import { systemUserStatusService } from '../../system-user-status/service/system-user-status.service';
import {
  systemUserStatusCreateComponent
} from '../../system-user-status/components/create/system-user-status-create.component';
import { systemRoleService } from '../../system-role/service/system-role.service';
import { systemRoleCreateComponent } from '../../system-role/components/create/system-role-create.component';

export abstract class systemUserDataForm {

  user: DataForm = {
    field: 'user',
    type: 'text',
    label: 'User',
    message: 'Ingrese minimo 1 letra y maximo 32'
  };
  password: DataForm = {
    field: 'password',
    type: 'text',
    label: 'Password',
    message: 'Ingrese minimo 1 letra y maximo 32'
  };
  email: DataForm = {
    field: 'email',
    type: 'text',
    label: 'Email',
    message: 'Ingrese minimo 1 letra y maximo 64'
  };
  selfie: DataForm = {
    field: 'selfie',
    type: 'text',
    label: 'Selfie',
    message: 'Ingrese minimo 1 letra y maximo 256'
  };
  tag: DataForm = {
    field: 'tag',
    type: 'text',
    label: 'Tag',
    message: 'Ingrese minimo 1 letra y maximo 16'
  };
  fullName: DataForm = {
    field: 'fullName',
    type: 'text',
    label: 'Full Name',
    message: 'Ingrese minimo 1 letra y maximo 256'
  };
  address: DataForm = {
    field: 'address',
    type: 'text',
    label: 'Address',
    message: 'Ingrese minimo 1 letra y maximo 256'
  };
  phone: DataForm = {
    field: 'phone',
    type: 'text',
    label: 'Phone',
    message: 'Ingrese minimo 1 letra y maximo 32'
  };
  area: DataForm = {
    field: 'area',
    type: 'number',
    label: 'Area',
    message: 'Ingrese un numero'
  };
  idOffice: DataForm = {
    field: 'idOffice',
    type: 'select',
    label: 'Id Office',
    message: 'Ingrese un office'
  };
  idSystemUserStatus: DataForm = {
    field: 'idSystemUserStatus',
    type: 'select',
    label: 'Id System User Status',
    message: 'Ingrese un systemUserStatus'
  };
  idSystemRole: DataForm = {
    field: 'idSystemRole',
    type: 'select',
    label: 'Id System Role',
    message: 'Ingrese un systemRole'
  };
  idEmployee: DataForm = {
    field: 'idEmployee',
    type: 'select',
    label: 'Id Employee',
    message: 'Ingrese un employee'
  };
  tries: DataForm = {
    field: 'tries',
    type: 'number',
    label: 'Tries',
    message: 'Ingrese un numero'
  };
  position: DataForm = {
    field: 'position',
    type: 'text',
    label: 'Position',
    message: 'Ingrese minimo 1 letra y maximo 64'
  };
  skype: DataForm = {
    field: 'skype',
    type: 'text',
    label: 'Skype',
    message: 'Ingrese minimo 1 letra y maximo 64'
  };

  protected constructor(systemUserStatusService: systemUserStatusService,
                        systemRoleService: systemRoleService) {
    this.idSystemUserStatus.items = systemUserStatusService.combo();
    this.idSystemUserStatus.empty = true;
    this.idSystemUserStatus.add = true;
    this.idSystemUserStatus.component = systemUserStatusCreateComponent;
    this.idSystemRole.items = systemRoleService.combo();
    this.idSystemRole.empty = true;
    this.idSystemRole.add = true;
    this.idSystemRole.component = systemRoleCreateComponent;
  }

  abstract submit(values): void;

  abstract return(): void;
}
