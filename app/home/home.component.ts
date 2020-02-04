import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Page, View, getViewById } from 'tns-core-modules/ui/page/page';
import { AnimationCurve } from 'tns-core-modules/ui/enums/enums';
import { screen } from "tns-core-modules/platform";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import set1 from '../assets/questions/set1.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  height: any = screen.mainScreen.heightDIPs;
  width: any = screen.mainScreen.widthDIPs;
  isLoad: boolean = false;
  selectedQuestion: any = [];
  correct: boolean = false;
  inboxMsg: string = 'Get camera permissions';
  set1:any = set1;
  correctWrongText: any;
  moneyWon: number = 1;

  @ViewChild("kqd", { read: ElementRef, static: false }) kqd: ElementRef;
  @ViewChild("screenwrapper", { read: ElementRef, static: false }) screenwrapper: ElementRef;

  correctWrongBgColor: string;
  tap1: string;
  tap: boolean = true;
  topValueNoob: number;
  leftValueDora: number;
  moneyWonLeft: any = this.width - 100;


  constructor(private page: Page, private http: HttpClient) {
    this.page.actionBarHidden = true;
  }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
   
  }

  initialAnimation() {

    this.getQuestions()
    console.log(this.width, this.height);
    const noob = < View > getViewById(this.kqd.nativeElement, "noob");
    const dora = < View > getViewById(this.kqd.nativeElement, "dora");
    const moneyWonRef = < View > getViewById(this.kqd.nativeElement, "moneyWonRef");

 
    
    
    let duration = 500;
    this.screenwrapper.nativeElement.animate({
      translate: {
        x: -40,
        y: 0
      },
      curve: AnimationCurve.easeOut,
      duration
    })
    .then(() => {
      this.topValueNoob = this.height - noob.getActualSize().height;
      this.leftValueDora = this.width - (dora.getActualSize().width*1.3);
      this.moneyWonLeft = this.width - 200;
      console.log(moneyWonRef.getActualSize().width);
    })
  }

  getQuestions() {
        var min = 0;
        var max = 6;
        var random = Math.floor(Math.random() * (+max - +min)) + +min;
        this.selectedQuestion = this.set1[random];
  }

  checkAnswer($event, tap) {
    if(tap === 'tap1') {
      console.log('callddedhhh');
      
      this.tap1 = "background: green";
      this.tap = false;
    }
    if ($event === this.selectedQuestion.answer) {
      this.correctAnswer()
      setTimeout(() => {
        this.selectedQuestion = [];
        this.correct = false;
        this.getQuestions();
      }, 2000)

    } else {
      this.wrongAnswer();
      setTimeout(() => {
        this.selectedQuestion = [];
        this.correct = false;
        this.getQuestions();
      }, 2000)
    }

  }

  correctAnswer() {
    this.moneyWon = this.moneyWon * 10;
    this.correctWrongText = "Correct Answer";
    this.correctWrongBgColor = "green";
    const duration = 800;
    const correct = < View > getViewById(this.kqd.nativeElement, "correct");
    const curve = AnimationCurve.easeInOut;
    correct.animate({ translate: { x:0, y:0 }, duration, curve })

    setTimeout(() => {
      correct.animate({ translate: { x:0, y:1000 }, duration, curve })
    },2000)
  }

  wrongAnswer() {
    this.moneyWon = 1;
    this.correctWrongText = "Wrong Answer";
    this.correctWrongBgColor = "red";

    const duration = 800;
    const correct = < View > getViewById(this.kqd.nativeElement, "correct");
    const curve = AnimationCurve.easeInOut;
    correct.animate({ translate: { x:0, y:0 }, duration, curve })

    setTimeout(() => {
      correct.animate({ translate: { x:0, y:1000 }, duration, curve })
    },2000)
  }

}