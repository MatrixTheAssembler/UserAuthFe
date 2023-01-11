import {Injectable} from "@angular/core";
import {RoleEnum} from "build/openapi/model/roleEnum";
import {HttpClient} from "@angular/common/http";
import {LoginApiService, User, UserApiService} from "../../../build/openapi";
import {map, Observable, take, tap} from "rxjs";
import {DataService} from "./data.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private user: User | undefined;

    private _accessToken = "";
    private _refreshToken = "";


    constructor(private http: HttpClient,
                private loginApiService: LoginApiService,
                private userApiService: UserApiService,
                private dataService: DataService) {
    }

    get isUserLoggedIn(): boolean {
        //TODO: true setzt login ausser Kraft
        return true;
        return this.accessToken !== "";
    }

    get username(): string | undefined {
        return this.user?.username;
    }

    get isLeser(): boolean {
        return this.user!.roles!.includes(RoleEnum.LESER);
    }

    get isAutor(): boolean {
        return this.user!.roles!.includes(RoleEnum.AUTOR);
    }

    get isModerator(): boolean {
        return this.user!.roles!.includes(RoleEnum.MODERATOR);
    }

    get isAdmin(): boolean {
        return this.user!.roles!.includes(RoleEnum.ADMIN);
    }

    set accessToken(accessToken: string) {
        this._accessToken = accessToken;
        this.dataService.saveAccessToken(accessToken);
    }

    get accessToken(): string {
        return this.dataService.getAccessToken();
    }

    set refreshToken(refreshToken: string) {
        this._refreshToken = refreshToken;
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
    }

    //gets user and sets user roles
    public authenticate(accessToken: string, refreshToken: string): void {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;

        //TODO: check if atob works
        const username = JSON.parse(window.atob(this._accessToken.split('.')[1])).sub;

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
        const refreshTokenUrl = this.userApiService.configuration.basePath + "/users/refreshtoken";

        return this.http.get(refreshTokenUrl,
            {headers: {"Authorization": `Bearer ${this.refreshToken}`}}
        ).pipe(take(1), map(response => response as { accessToken: string, refreshToken: string }),
            tap(response => {
                this.accessToken = response.accessToken;
                this.refreshToken = response.refreshToken;
                this.authenticate(this.accessToken, this.refreshToken);
            })
        );
    }
}
