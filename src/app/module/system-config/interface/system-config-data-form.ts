import { DataForm } from '../../../interfaces/data-form';

export abstract class systemConfigDataForm {

    name: DataForm = {
    field: 'name',
    type: 'text',
    label: 'Name',
    message: 'Ingrese minimo 1 letra y maximo 64'
  };
  value: DataForm = {
    field: 'value',
    type: 'text',
    label: 'Value',
    message: 'Ingrese minimo 1 letra y maximo 32'
  };
  tipeofHTML: DataForm = {
    field: 'tipeofHTML',
    type: 'text',
    label: 'Tipeof H T M L',
    message: 'Ingrese minimo 1 letra y maximo 16'
  };
  category: DataForm = {
    field: 'category',
    type: 'number',
    label: 'Category',
    message: 'Ingrese un numero'
  };
  configKey: DataForm = {
    field: 'configKey',
    type: 'text',
    label: 'Config Key',
    message: 'Ingrese minimo 1 letra y maximo 32'
  };

    protected constructor() {
        
    }

    abstract submit(values): void;

    abstract return(): void;
}
