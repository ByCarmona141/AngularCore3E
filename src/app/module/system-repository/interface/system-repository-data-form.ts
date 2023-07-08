import { DataForm } from '../../../interfaces/data-form';

export abstract class systemRepositoryDataForm {

    name: DataForm = {
    field: 'name',
    type: 'text',
    label: 'Name',
    message: 'Ingrese minimo 1 letra y maximo 512'
  };
  description: DataForm = {
    field: 'description',
    type: 'text',
    label: 'Description',
    message: 'Ingrese minimo 1 letra y maximo 256'
  };
  size: DataForm = {
    field: 'size',
    type: 'number',
    label: 'Size',
    message: 'Ingrese un numero'
  };
  entity: DataForm = {
    field: 'entity',
    type: 'text',
    label: 'Entity',
    message: 'Ingrese minimo 1 letra y maximo 64'
  };
  tuple: DataForm = {
    field: 'tuple',
    type: 'text',
    label: 'Tuple',
    message: 'Ingrese minimo 1 letra y maximo 64'
  };
  route: DataForm = {
    field: 'route',
    type: 'text',
    label: 'Route',
    message: 'Ingrese minimo 1 letra y maximo 512'
  };

    protected constructor() {
        
    }

    abstract submit(values): void;

    abstract return(): void;
}
