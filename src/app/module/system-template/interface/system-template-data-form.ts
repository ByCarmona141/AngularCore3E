import { DataForm } from '../../../interfaces/data-form';

export abstract class systemTemplateDataForm {

    name: DataForm = {
    field: 'name',
    type: 'text',
    label: 'Name',
    message: 'Ingrese minimo 1 letra y maximo 32'
  };
  header: DataForm = {
    field: 'header',
    type: 'text',
    label: 'Header',
    message: 'Ingrese minimo 1 letra y maximo 4294967295'
  };
  body: DataForm = {
    field: 'body',
    type: 'text',
    label: 'Body',
    message: 'Ingrese minimo 1 letra y maximo 4294967295'
  };
  footer: DataForm = {
    field: 'footer',
    type: 'text',
    label: 'Footer',
    message: 'Ingrese minimo 1 letra y maximo 4294967295'
  };
  orientation: DataForm = {
    field: 'orientation',
    type: 'text',
    label: 'Orientation',
    message: 'Ingrese minimo 1 letra y maximo 32'
  };
  size: DataForm = {
    field: 'size',
    type: 'text',
    label: 'Size',
    message: 'Ingrese minimo 1 letra y maximo 32'
  };
  headerSpacing: DataForm = {
    field: 'headerSpacing',
    type: 'number',
    label: 'Header Spacing',
    message: 'Ingrese un numero'
  };
  footerSpacing: DataForm = {
    field: 'footerSpacing',
    type: 'number',
    label: 'Footer Spacing',
    message: 'Ingrese un numero'
  };
  frontPage: DataForm = {
    field: 'frontPage',
    type: 'number',
    label: 'Front Page',
    message: 'Ingrese un numero'
  };
  script: DataForm = {
    field: 'script',
    type: 'text',
    label: 'Script',
    message: 'Ingrese minimo 1 letra y maximo 65535'
  };
  json: DataForm = {
    field: 'json',
    type: 'text',
    label: 'Json',
    message: 'Ingrese minimo 1 letra y maximo 4294967295'
  };

    protected constructor() {
        
    }

    abstract submit(values): void;

    abstract return(): void;
}
