import {Component, OnInit} from '@angular/core';
import {MockService} from "../../services/mock.service";
import {RoleEnum, User} from "../../../../build/openapi";

@Component({
    selector: 'app-admin-console',
    templateUrl: './admin-console.component.html',
    styleUrls: ['./admin-console.component.scss']
})
export class AdminConsoleComponent implements OnInit {
    private _users: User[] = [];

    public RolesEnum = RoleEnum;

    constructor(private mockService: MockService) {
    }

    ngOnInit(): void {
        this._users = this.mockService.getUsers(10);
    }

    get users(): User[] {
        return this._users;
    }

    changeRole(user: User, role: RoleEnum): void {
        this._users.find(u => u.id === user.id)!.roles!.push(role);
    }

    public firstLetterBig(role: RoleEnum): string {
        return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
    }
}
