import {Component, OnInit} from "@angular/core"; 
import {Employee} from "../model/employee.model"; 
import {EmployeeRepository} from "../model/employee.repository";
import {AuthService} from "../model/auth.service"; 
import {Router} from "@angular/router"; 
import { NotificationService} from '../notification/notification.service'; 
import {HahuNotification, INotify} from '../model/notification'; 


@Component({
    selector: "dashboard", 
    templateUrl: "dashboard.component.html", 
    styleUrls: ["dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
    
    public notification: INotify; 
    
    constructor(private auth: AuthService,  private router: Router, private notificationService: NotificationService){ }
    
    ngOnInit(){
     this.subscribeToNotification(); 
    }

    subscribeToNotification(): void {
        this.notification = new HahuNotification; 
        this.notificationService
          .getNotification()
          .subscribe(notification =>{
            this.notification = notification; 
          }); 
      }
      dummyMessage(){
        this.notificationService.error('The notification works')
        setTimeout(()=>{
          this.notificationService.resetNotification(); 
        }, 3000); 
       
      }
  
    
      displayNotification(): boolean {
        return this.notification.message.length > 0; 
      }

    checkLogin(): boolean{
      return this.auth.checkLogin();
    }

   
    logout(){
        this.auth.clear(); 
        this.router.navigateByUrl("/");
    }

    getStyle(){
      return "bg-success"
    }
   
}