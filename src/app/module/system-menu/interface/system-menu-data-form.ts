import { DataForm } from '../../../interfaces/data-form';
import { systemIconService } from '../../system-icon/service/system-icon.service';
import { systemIconCreateComponent } from '../../system-icon/components/create/system-icon-create.component';
import { systemTypeElementService } from '../../system-type-element/service/system-type-element.service';
import {
    systemTypeElementCreateComponent
} from '../../system-type-element/components/create/system-type-element-create.component';
import { systemRoleService } from '../../system-role/service/system-role.service';
import { systemMenuService } from '../service/system-menu.service';

export abstract class systemMenuDataForm {

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
        message: 'Ingrese minimo 1 letra y maximo 64'
    };
    href: DataForm = {
        field: 'href',
        type: 'text',
        label: 'Href',
        message: 'Ingrese minimo 1 letra y maximo 256'
    };
    idSystemIcon: DataForm = {
        field: 'idSystemIcon',
        type: 'select',
        label: 'Id System Icon',
        message: 'Ingrese un icono'
    };
    category: DataForm = {
        field: 'category',
        type: 'select',
        label: 'Category',
        message: 'Ingrese un numero'
    };
    priority: DataForm = {
        field: 'priority',
        type: 'number',
        label: 'Priority',
        message: 'Ingrese un numero'
    };
    idSystemTypeElement: DataForm = {
        field: 'idSystemTypeElement',
        type: 'select',
        label: 'Id System Type Element',
        message: 'Ingrese un systemTypeElement'
    };
    roles: DataForm = {
        field: 'roles',
        type: 'select',
        label: 'Roles',
        message: 'Ingrese los roles',
        multiple: true,
    };

    protected constructor(service: systemMenuService,
                          systemIconService: systemIconService,
                          systemTypeElementService: systemTypeElementService,
                          systemRoleService: systemRoleService) {
        this.idSystemIcon.items = systemIconService.combo();
        this.idSystemIcon.empty = true;
        this.idSystemIcon.add = false;
        this.idSystemIcon.icon = true;
        this.idSystemIcon.component = systemIconCreateComponent;
        this.category.items = service.combo();
        this.category.empty = true;
        this.category.emptyMessage = "MISMA CATEGORIA";
        this.idSystemTypeElement.items = systemTypeElementService.combo();
        this.idSystemTypeElement.empty = true;
        this.idSystemTypeElement.add = false;
        this.idSystemTypeElement.component = systemTypeElementCreateComponent;
        this.roles.items = systemRoleService.combo();
        this.roles.empty = true;
        this.roles.multiple = true;
    }

    abstract submit(values): void;

    abstract return(): void;
}
