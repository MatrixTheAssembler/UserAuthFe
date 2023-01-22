import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {TestApiService} from "../../../../build/openapi";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    constructor(private router: Router,
                private testService: TestApiService,
                private authService: AuthService) {
    }

    public register(): void {
        this.router.navigate(["register"]);
    }

    public login(): void {
        this.router.navigate(["login"]);
    }

    public logout(): void{
        this.authService.logout();
    }

    public newArticle(): void {
        this.router.navigate(["new-article"]);
    }

    public adminConsole(): void {
        this.router.navigate(["admin-console"]);
    }

    get isLoggedIn(): boolean {
        return this.authService.isUserLoggedIn;
    }

    get isAutor(): boolean {
        return this.authService.isAutor;
    }

    get isAdmin(): boolean {
        return this.authService.isAdmin;
    }

    test() {
        this.testService.test().subscribe({
            next: response =>
                console.log("Yeah" + response),
            error: err =>
                console.log("Oh" + err)
        });
    }
}
