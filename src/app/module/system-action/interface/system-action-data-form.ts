import { DataForm } from '../../../interfaces/data-form';

export abstract class systemActionDataForm {

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
    message: 'Ingrese minimo 1 letra y maximo 128'
  };

    protected constructor() {
        
    }

    abstract submit(values): void;

    abstract return(): void;
}
