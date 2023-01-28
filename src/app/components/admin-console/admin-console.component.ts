import {Component, OnInit} from '@angular/core';
import {RoleEnum, User, UserApiService} from "../../../../build/openapi";
import {take} from "rxjs";
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'app-admin-console',
    templateUrl: './admin-console.component.html',
    styleUrls: ['./admin-console.component.scss']
})
export class AdminConsoleComponent implements OnInit {
    private _users: User[] = [];

    public RolesEnum = RoleEnum;

    constructor(private authService: AuthService,
                private userApiService: UserApiService) {
    }

    ngOnInit(): void {
        this.userApiService.getAllUsers()
            .pipe(take(1))
            .subscribe(users => this._users = users);
    }

    get users(): User[] {
        return this._users.filter(u => u.username !== this.authService.username);
    }

    public changeRole(user: User, role: RoleEnum): void {
        if (user.roles!.includes(role)) {
            user.roles!.splice(user.roles!.indexOf(role), 1);
        } else {
            user.roles!.push(role);
        }

        this.userApiService.updateUser(user.username, user.roles!)
            .pipe(take(1))
            .subscribe(resp =>
                this._users.find(u => u.id === user.id)!.roles = resp.roles
            );

        this.authService.refreshTokens();
    }

    public firstLetterBig(role: RoleEnum): string {
        return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
    }
}
