import {Injectable} from '@angular/core';
import {Article, Comment, RoleEnum, User} from "../../../build/openapi";

@Injectable({
    providedIn: 'root'
})
export class MockService {

    private possibleRoles: RoleEnum[] = [RoleEnum.LESER, RoleEnum.AUTOR, RoleEnum.MODERATOR, RoleEnum.ADMIN];

    constructor() {
    }

    public getUsers(numUsers: number): any[]{
        const users: User[] = [];

        for(let i = 0; i < numUsers; i++){

            const roles: RoleEnum[] = [];
            const numRoles = Math.floor(Math.random() * this.possibleRoles.length) + 1;
            for (let i = 0; i < numRoles; i++) {
                roles.push(this.possibleRoles[Math.floor(Math.random() * this.possibleRoles.length)]);
            }

            users.push({
                id: "",
                username: "User " + i,
                roles
            });
        }

        return users;
    }

    public getArticles(numArticles: number, numComments: number): Article[]{
        const articles: Article[] = [];

        for(let i = 0; i < numArticles; i++){
            const comments: Comment[] = [];

            for (let j = 0; j < numComments; j++) {
                comments.push({
                    id: j,
                    content: j + " Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
                })
            }

            const article: Article = {
                id: i,
                headLine: "Headline " + i,
                content: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
                comments
            }

            articles.push(article);
        }

        return articles;
    }

    public getArticle(id: number, numComments: number): Article{
        const comments: Comment[] = [];
        for (let i = 0; i < numComments; i++) {
            comments.push({
                id: i,
                content: i + " Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
            });
        }

        return {
            id,
            headLine: "Headline " + id,
            content: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
            comments
        };
    }
}
