import { DataForm } from '../../../interfaces/data-form';

export abstract class systemTypeElementDataForm {

    name: DataForm = {
    field: 'name',
    type: 'text',
    label: 'Name',
    message: 'Ingrese minimo 1 letra y maximo 100'
  };

    protected constructor() {
        
    }

    abstract submit(values): void;

    abstract return(): void;
}
