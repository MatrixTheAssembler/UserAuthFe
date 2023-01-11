import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    constructor(private router: Router,
                private authService: AuthService) {
    }

    get isLoggedIn(): boolean {
        return this.authService.isUserLoggedIn;
    }

    public login(): void {
        this.router.navigate(["login"]);
    }

    public logout(): void{
        this.authService.logout();
    }
}
