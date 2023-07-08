import { DataForm } from '../../../interfaces/data-form';
import { systemOrientationService } from '../../system-orientation/service/system-orientation.service';
import { systemOrientationCreateComponent } from '../../system-orientation/components/create/system-orientation-create.component';
import { systemSizeService } from '../../system-size/service/system-size.service';
import { systemSizeCreateComponent } from '../../system-size/components/create/system-size-create.component';

export abstract class systemTemplateDataForm {

  name: DataForm = {
    field: 'name',
    type: 'text',
    label: 'Name',
    message: 'Ingrese minimo 1 letra y maximo 32'
  };
  json: DataForm = {
    field: 'json',
    type: 'textarea',
    label: 'Json',
    cols: 5,
    rows: 5,
    message: 'Ingrese minimo 1 letra y maximo 4294967295'
  };
  header: DataForm = {
    field: 'header',
    type: 'textarea',
    label: 'Header',
    cols: 5,
    rows: 5,
    message: 'Ingrese minimo 1 letra y maximo 4294967295'
  };
  body: DataForm = {
    field: 'body',
    type: 'textarea',
    label: 'Body',
    cols: 5,
    rows: 5,
    message: 'Ingrese minimo 1 letra y maximo 4294967295'
  };
  footer: DataForm = {
    field: 'footer',
    type: 'textarea',
    label: 'Footer',
    cols: 5,
    rows: 5,
    message: 'Ingrese minimo 1 letra y maximo 4294967295'
  };
  orientation: DataForm = {
    field: 'orientation',
    type: 'select',
    label: 'Orientation',
    message: 'Ingrese un systemOrientation'
  };
  size: DataForm = {
    field: 'size',
    type: 'select',
    label: 'Size',
    message: 'Ingrese un systemSize'
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
    type: 'textarea',
    label: 'Front Page',
    cols: 5,
    rows: 5,
    message: 'Ingrese minimo 1 letra y maximo 4294967295'
  };
  marginLeft: DataForm = {
    field: 'marginLeft',
    type: 'number',
    label: 'Margin Left',
    message: 'Ingrese un numero'
  };
  marginRight: DataForm = {
    field: 'marginRight',
    type: 'number',
    label: 'Margin Right',
    message: 'Ingrese un numero'
  };
  marginTop: DataForm = {
    field: 'marginTop',
    type: 'number',
    label: 'Margin Top',
    message: 'Ingrese un numero'
  };
  marginBottom: DataForm = {
    field: 'marginBottom',
    type: 'number',
    label: 'Margin Bottom',
    message: 'Ingrese un numero'
  };
  script: DataForm = {
    field: 'script',
    type: 'textarea',
    label: 'Script',
    cols: 5,
    rows: 5,
    message: 'Ingrese minimo 1 letra y maximo 65535'
  };

    protected constructor(systemOrientationService: systemOrientationService, systemSizeService: systemSizeService) {
        this.orientation.items = systemOrientationService.combo();
        this.orientation.empty = true;
        this.orientation.add = true;
        this.orientation.component = systemOrientationCreateComponent;

        this.size.items = systemSizeService.combo();
        this.size.empty = true;
        this.size.add = true;
        this.size.component = systemSizeCreateComponent;
    }

    abstract submit(values): void;

    abstract return(): void;
}
