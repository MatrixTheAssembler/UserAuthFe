import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./services/auth.service";
import {MessageService} from "./services/message.service";
import {take} from "rxjs";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
    title = 'UserAuthFe';

    constructor(private router: Router,
                private authService: AuthService,
                private messageService: MessageService) {
    }

    ngOnInit(): void {
        if (this.authService.refreshToken.length) {
            this.authService.refreshTokens().pipe(take(1)).subscribe({
                error: () => {
                    this.authService.logout();
                    this.router.navigate([""]);
                }
            });
        }

        //if a logout happens in another tab, this tab will also log out
        window.addEventListener("storage", (event) => {
            if (event.storageArea == localStorage && !document.hasFocus()) {
                let refreshToken = this.authService.refreshToken;

                if (!refreshToken.length) {
                    this.authService.logout();
                    this.router.navigate([""]);
                } else {
                    this.authService.refreshTokens().pipe(take(1)).subscribe({
                        error: () => {
                            this.authService.logout();
                            this.router.navigate([""]);
                        }
                    });
                }
            }
        });
    }

    get showAlert(): boolean {
        return this.messageService.showAlert;
    }

    get alertMessage(): string {
        return this.messageService.alertMessage;
    }

    public closeAlert(): void {
        this.messageService.closeAlert();
    }
}
