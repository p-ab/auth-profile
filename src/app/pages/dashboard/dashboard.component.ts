import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { WorldcupService } from '../../services/worldcup/worldcup.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  title: string = 'Главная';
  
  breakpoint: number;
  groups: string[];
  groupStageData: any;

  get user() {
    return this.authService.user;
  }

  get authCompleted() {
    return this.authService.isLogged;
  }

  constructor( private authService: AuthService, 
               private wcService: WorldcupService,
               private router: Router  ) { }

  ngOnInit() {
    
    this.wcService.getTeams().subscribe(success => {
        console.dir(success);

        success.data.forEach( (group, index) => {
          group.values.map( (d, i) => {
              let matches = {goals: {}, stats: [], id_list: []};
              for (let key in d.matches) {
                matches.goals = JSON.parse(d.matches.goals);
                matches.stats = JSON.parse(d.matches.stats);
                matches.id_list = JSON.parse(d.matches.id_list);                
              }
              group.values[i].matches = matches;
          })

          group.values.sort( (a, b) => {
            let bGr = b.matches.stats;
            let aGr = a.matches.stats;
            return (bGr[0] * 3 + bGr[1])  - (aGr[0] * 3 + aGr[1])
          });
        })
        this.groupStageData = success.data;
      }, error => console.log(error));

    this.breakpoint = (window.innerWidth <= 780) ? 2 : 4;
    this.groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 780) ? 2 : 4;
  }

}