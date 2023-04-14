import { DataForm } from '../../../interfaces/data-form';

export abstract class systemUserStatusDataForm {

    name: DataForm = {
    field: 'name',
    type: 'text',
    label: 'Name',
    message: 'Ingrese minimo 1 letra y maximo 32'
  };
  description: DataForm = {
    field: 'description',
    type: 'text',
    label: 'Description',
    message: 'Ingrese minimo 1 letra y maximo 32'
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
