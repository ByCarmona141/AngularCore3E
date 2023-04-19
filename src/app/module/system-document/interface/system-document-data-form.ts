import { DataForm } from '../../../interfaces/data-form';
import { systemTemplateService } from '../../system-template/service/system-template.service';
import { systemTemplateCreateComponent } from '../../system-template/components/create/system-template-create.component';

export abstract class systemDocumentDataForm {

    idSystemTemplate: DataForm = {
    field: 'idSystemTemplate',
    type: 'select',
    label: 'Id System Template',
    message: 'Ingrese un systemTemplate'
  };
  content: DataForm = {
    field: 'content',
    type: 'text',
    label: 'Content',
    message: 'Ingrese minimo 1 letra y maximo 4294967295'
  };
  dateCreate: DataForm = {
    field: 'dateCreate',
    type: 'datetime-local',
    label: 'Date Create',
    message: 'Ingrese una fecha'
  };

    protected constructor(systemTemplateService: systemTemplateService) {
        this.idSystemTemplate.items = systemTemplateService.combo();
    this.idSystemTemplate.empty = true;
    this.idSystemTemplate.add = true;
    this.idSystemTemplate.component = systemTemplateCreateComponent;
    }

    abstract submit(values): void;

    abstract return(): void;
}
