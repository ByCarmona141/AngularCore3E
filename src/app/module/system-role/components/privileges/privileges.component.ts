import { expressionType } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { systemRoleService } from '../../service/system-role.service';

@Component({
    selector: 'app-privileges',
    templateUrl: './privileges.component.html',
    styleUrls: ['./privileges.component.scss']
})
export class PrivilegesComponent implements OnInit {
    form: FormGroup;
    load = true;
    register = false;

    id: number;
    rol = '';
    data: any;

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private formBuilder: FormBuilder,
                private service: systemRoleService) {
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(params => {
            this.id = params.id;
            this.form = this.formBuilder.group({});

            this.service.privilegesRole(this.id)
                .subscribe(resp => {
                    this.data = resp;
                    this.rol = resp.name;

                    this.initForm();

                    this.load = false;

                }, error => this.router.navigateByUrl('/systemRole'));
        });
    }

    initForm(): void {
        console.log(this.data);
        this.data.privilegesRole.forEach(item => {
            this.form.addControl(
                item.id + '-' + item.name,
                this.formBuilder.array([])
            );

            item.privileges.forEach(privilege => {
                // @ts-ignore
                this.form.get(item.id + '-' + item.name).controls.push(
                    this.formBuilder.control(privilege, [])
                );
            });
        });
    }

    submit(): void {
        this.register = true;

        const formValue = [];
        Object.keys(this.form.controls).forEach(key => {
            const control = this.form.get(key);
            const privileges = [];
            // @ts-ignore
            for (const item of control.controls) {
                privileges.push(item.value);
            }

            formValue.push({
                form: key,
                privileges
            });
        });

        if (this.form.valid) {
            this.service.setSystemRolePrivileges(formValue, this.id)
                .subscribe(() => {
                    this.router.navigateByUrl('/systemRole');
                    this.register = false;
                }, error => {
                    this.register = false;
                });
        } else {
            Object.values(this.form.controls).forEach(control => control.markAllAsTouched());
            this.register = false;
        }
    }

    allPrivilegesForm(target: EventTarget, formPrivilege: string): void {
        const input = target as HTMLInputElement;

        // @ts-ignore
        const controls = this.form.get(formPrivilege).controls;
        controls.forEach(control => {
            control.patchValue(input.checked);
        });
    }


    allPrivilegesPrivilege(target: EventTarget, i: number): void {
        const input = target as HTMLInputElement;

        for (const key of Object.keys(this.form.controls)) {
            const control = this.form.get(key);
            // @ts-ignore
            control.controls[i].patchValue(input.checked);
        }
    }

    allPrivileges(target: EventTarget): void {
        const input = target as HTMLInputElement;
        for (const key of Object.keys(this.form.controls)) {
            const control = this.form.get(key);

            // @ts-ignore
            control.controls.forEach(item => {
                item.patchValue(input.checked);
            });
        }
    }
}
