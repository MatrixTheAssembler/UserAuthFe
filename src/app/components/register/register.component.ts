import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ViewportScroller} from "@angular/common";
import {AuthService} from "../../services/auth.service";
import {DataService} from "../../services/data.service";
import {MessageService} from "../../services/message.service";
import {RegisterApiService} from "../../../../build/openapi";
import {take} from "rxjs";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    public registerForm!: FormGroup;

    constructor(private router: Router,
                private viewportScroller: ViewportScroller,
                private authService: AuthService,
                private dataService: DataService,
                private messageService: MessageService,
                private registerApiService: RegisterApiService) {
    }

    ngOnInit(): void {
        this.registerForm = new FormGroup({
            username: new FormControl("", [Validators.required]),
            password: new FormControl("", [Validators.required]),
            confirmPassword: new FormControl("", [Validators.required])
        });
    }

    public register(): void {
        const username = this.registerForm.value.username;
        const password = this.registerForm.value.password;
        const confirmPassword = this.registerForm.value.confirmPassword;

        if (password !== confirmPassword) {
            this.displayAlert("Passwords do not match.", "danger");
            return;
        }

        this.registerApiService.register({username, password})
            .pipe(take(1))
            .subscribe({
                next: () => {
                    this.registerForm.reset();
                    this.router.navigate(["/login"]);
                },
                error: (err: string) => this.displayAlert(err, "danger")
            });


    }

    public displayAlert(message: string, error: string): void {
        this.messageService.displayAlert(message, error);
        this.viewportScroller.scrollToPosition([0, 0]);
    }

    get isValidForm(): boolean {
        return this.registerForm.valid;
    }
}
