import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {ViewportScroller} from "@angular/common";
import {AuthService} from "../../services/auth.service";
import {DataService} from "../../services/data.service";
import {MessageService} from "../../services/message-service.service";
import {LoginApiService} from "../../../../build/openapi";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
    public registerForm!: FormGroup;

    constructor(private router: Router,
                private viewportScroller: ViewportScroller,
                private authService: AuthService,
                private dataService: DataService,
                private messageService: MessageService) {
    }

    ngOnInit(): void {
        this.registerForm = new FormGroup({
            username: new FormControl(""),
            password: new FormControl("")
        });
    }

    public register(): void {
        const username = this.registerForm.value.username;
        const password = this.registerForm.value.password;

        //TODO: Implement register
    }

    public displayAlert(message: string, error: string): void {
        this.messageService.displayAlert(message, error);
        this.viewportScroller.scrollToPosition([0, 0]);
    }
}
