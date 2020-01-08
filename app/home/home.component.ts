import { Component, ViewChild, ElementRef } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { View, getViewById } from "tns-core-modules/ui/core/view";
import { AnimationCurve } from 'tns-core-modules/ui/enums/enums';
// import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {


  @ViewChild("doraemonTitle", { read: ElementRef, static: false }) doraemonTitle: ElementRef;



  selectedQuestion:any = [];
  correct:boolean = false;

  constructor(private page: Page) { 
    this.page.actionBarHidden = true;
  }

  initialAnimation() {

    this.getQuestions()
    
    let duration = 500;
      
      this.doraemonTitle.nativeElement.originY = 0;
      this.doraemonTitle.nativeElement.animate({ scale: { x: 2, y: 2 }, curve: AnimationCurve.easeInOut, duration })
      .then(() => {
           this.doraemonTitle.nativeElement.animate({ translate: { x: 1, y: 1 }, curve: AnimationCurve.easeOut, duration })
        })
      
       
   
  }

  getQuestions(){
    //  this.http.get('https://ixhimanshu.github.io/javascript-weather-api/json/questions.json')
    //  .subscribe( (res: any) => {
    //    console.log(res);
       
    //  } )

     fetch('https://ixhimanshu.github.io/javascript-weather-api/json/questions.json')
    .then( (res) => res.json() )
    .then( (res) => {
        var min=0; 
        var max=6;  
        var random = 
        Math.floor(Math.random() * (+max - +min)) + +min; 

      this.selectedQuestion = res[random];
      console.log(this.selectedQuestion);
      
    })
  }

  checkAnswer($event){
    console.log($event)
    if($event === this.selectedQuestion.answer){
      this.correct = true;
      setTimeout( () => {
        this.initialAnimation();
        this.selectedQuestion = [];
        this.correct = false;
      }, 2000 )
    
    } 
    
  }

}
