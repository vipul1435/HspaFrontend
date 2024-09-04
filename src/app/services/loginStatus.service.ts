import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class LoginStatusService{
    private stateSource = new BehaviorSubject<boolean>(false);
    loginStatus = this.stateSource.asObservable();

    updateState(newState:boolean){
        this.stateSource.next(newState);
    }
}