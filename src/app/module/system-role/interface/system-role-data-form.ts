import { DataForm } from '../../../interfaces/data-form';

export abstract class systemRoleDataForm {

    name: DataForm = {
    field: 'name',
    type: 'text',
    label: 'Name',
    message: 'Ingrese minimo 1 letra y maximo 128'
  };
  active: DataForm = {
    field: 'active',
    type: 'number',
    label: 'Active',
    message: 'Ingrese un numero'
  };

    protected constructor() {
        
    }

    abstract submit(values): void;

    abstract return(): void;
}
