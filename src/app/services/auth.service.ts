import {Injectable} from "@angular/core";
import {RoleEnum} from "build/openapi/model/roleEnum";
import {HttpClient} from "@angular/common/http";
import {LoginApiService, User, UserApiService} from "../../../build/openapi";
import {map, Observable, of, take, tap} from "rxjs";
import {DataService} from "./data.service";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private user: User | undefined;


    constructor(private http: HttpClient,
                private router: Router,
                private loginApiService: LoginApiService,
                private userApiService: UserApiService,
                private dataService: DataService) {
    }

    get isLoggedIn(): boolean {
        return this.accessToken !== "";
    }

    get username(): string | undefined {
        return this.user?.username;
    }

    get userFromToken(): Observable<User | undefined> {
        if (!this.isLoggedIn) {
            return of(undefined);
        }
        const username = JSON.parse(window.atob(this.accessToken.split('.')[1])).sub;
        return this.userApiService.getUserByUsername(username).pipe(take(1));
    }


    get isLeser(): boolean {
        if (!this.user)
            return false;
        return this.user!.roles!.includes(RoleEnum.LESER);
    }

    get isAutor(): boolean {
        if (!this.user)
            return false;
        return this.user!.roles!.includes(RoleEnum.AUTOR);
    }

    get isAutorObservable(): Observable<boolean> {
        return this.userFromToken.pipe(map(user => {
            if (!user) {
                return false;
            }
            return user.roles!.includes(RoleEnum.AUTOR);
        }));
    }

    get isModerator(): boolean {
        if (!this.user) {
            return false;
        }
        return this.user!.roles!.includes(RoleEnum.MODERATOR);
    }

    get isAdmin(): boolean {
        if (!this.user)
            return false;
        return this.user!.roles!.includes(RoleEnum.ADMIN);
    }

    get isAdminObservable(): Observable<boolean> {
        return this.userFromToken.pipe(map(user => {
            if (!user) {
                return false;
            }
            return user.roles!.includes(RoleEnum.ADMIN);
        }));
    }

    set accessToken(accessToken: string) {
        this.dataService.saveAccessToken(accessToken);
    }

    get accessToken(): string {
        return this.dataService.getAccessToken();
    }

    set refreshToken(refreshToken: string) {
        this.dataService.saveRefreshToken(refreshToken);
    }

    get refreshToken(): string {
        return this.dataService.getRefreshToken();
    }

    public logout(): void {
        this.accessToken = "";
        this.refreshToken = "";
        this.user = undefined;
        this.dataService.clear();
        this.router.navigate([""]);
    }

    //gets user and sets user roles
    public authenticate(accessToken: string, refreshToken: string): void {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;

        const username = JSON.parse(window.atob(this.accessToken.split('.')[1])).sub;

        this.userApiService.getUserByUsername(username).pipe(take(1)).subscribe({
            next: response => {
                this.user = response;
            },
            error: err => {
                console.log(err);
                this.logout();
            }
        });
    }

    //used to refresh tokens
    public refreshTokens(): Observable<any> {
        const refreshTokenUrl = this.userApiService.configuration.basePath + "/refreshTokens";

        return this.http.get(refreshTokenUrl,
            {headers: {"Authorization": `Bearer ${this.refreshToken}`}}
        ).pipe(take(1),
            map(response => response as { accessToken: string, refreshToken: string }),
            tap(response => {
                this.accessToken = response.accessToken;
                this.refreshToken = response.refreshToken;
                this.authenticate(this.accessToken, this.refreshToken);
                this.userFromToken.subscribe(response => this.user = response);
            })
        );
    }
}
