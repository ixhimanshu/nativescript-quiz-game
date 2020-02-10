import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Page, View, getViewById } from 'tns-core-modules/ui/page/page';
import { AnimationCurve } from 'tns-core-modules/ui/enums/enums';
import { screen } from "tns-core-modules/platform";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import set1 from '../assets/questions/set1.json';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild("kqd", { read: ElementRef, static: false }) kqd: ElementRef;
  @ViewChild("screenwrapper", { read: ElementRef, static: false }) screenwrapper: ElementRef;
  @ViewChild("queans", { read: ElementRef, static: false }) queans: ElementRef;

  height: any = screen.mainScreen.heightDIPs;
  width: any = screen.mainScreen.widthDIPs;
  isLoad: boolean = false;
  selectedQuestion: any = [];
  correct: boolean = false;
  set1:any = set1;
  correctWrongText: any;
  moneyWon: any = 0;
  correctWrongBgColor: string;
  tap1: string;
  tap: boolean = true;
  topValueNoob: number;
  leftValueDora: number;
  currentQuestionState: number = 0;
  moneyWonLeft: any = this.width - 100;
  correctAnswer: any;
  wrongAnswerCount: any = 0;
  fiftyFiftyStatus: boolean = false;
  isAudience: boolean;
  isPhone: boolean;
  isAnswerShown: false;
  bgImg: any;
  isGameWon: boolean;


  constructor(private page: Page, private http: HttpClient, private route: Router) {
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
    let duration = 500;
    this.screenwrapper.nativeElement.animate({
      translate: { x: -40, y: 0  },
      curve: AnimationCurve.easeOut,
      duration
    })
    .then(() => {
      this.topValueNoob = this.height - noob.getActualSize().height;
      this.leftValueDora = this.width - (dora.getActualSize().width*1.3);
      this.moneyWonLeft = this.width - 190;
    })
  }

  getQuestions() {
        this.currentQuestionState++;
        var min = 0;
        var max = 9;
        var random = Math.floor(Math.random() * (+max - +min)) + +min;
        this.selectedQuestion = this.set1[random];
        var randomBg = Math.floor(Math.random() * (+4 - +1)) + +1;
        this.bgImg = randomBg;
  }

  checkAnswer($event, tap) {
    if(tap === 'tap1') {
      this.tap1 = "background: green";
      this.tap = false;
    }
    if ($event === this.selectedQuestion.answer) {
      this.onCorrectAnswer()
      setTimeout(() => {
        this.selectedQuestion = [];
        this.correct = false;
        this.getQuestions();
      }, 1000)

    } else {
      this.onWrongAnswer();
      setTimeout(() => {
        this.selectedQuestion = [];
        this.correct = false;
        this.getQuestions();
      }, 2000)
    }

  }

  onCorrectAnswer() {
    this.correctWrongText = "Correct Answer";
    this.correctWrongBgColor = "#21bf73";
    const duration = 500;
    const correct = < View > getViewById(this.kqd.nativeElement, "correct");
    const curve = AnimationCurve.easeInOut;
    correct.animate({ translate: { x:0, y:0 }, duration, curve })
    if(this.moneyWon === 0) {
      this.moneyWon = 100;
    } else {
      this.moneyWon = this.moneyWon * 10;
    }
    setTimeout(() => {
      correct.animate({ translate: { x:0, y:1000 }, duration, curve })
    },2000)
    if(this.currentQuestionState === 5) {
      this.isGameWon = true;
      setTimeout( () => {
        this.route.navigate(['/landing-page']);
      }, 5000 )
    }
  }

  onWrongAnswer() {
    this.currentQuestionState = 0;
    this.correctWrongText = "Wrong Answer";
    this.correctWrongBgColor = "#ff5d6c";
    const duration = 500;
    const correct = < View > getViewById(this.kqd.nativeElement, "correct");
    const curve = AnimationCurve.easeInOut;
    correct.animate({ translate: { x:0, y:0 }, duration, curve })
    this.moneyWon = 0;
    setTimeout(() => {
      correct.animate({ translate: { x:0, y:1001 }, duration, curve })
    },2000)
  }

  getKeyByValue(fifty, value) {
    return Object.keys(fifty).find(key => fifty[key] === value);
  }

  onHomeBtn() {
    this.route.navigate(['/landing-page'])
  }

  reset() {
    this.initialAnimation();
    this.getQuestions();
    this.fiftyFiftyStatus = false;
    this.wrongAnswerCount = 0;
  }

  onAudience() {
    this.isAnswerShown = false;
    this.isAudience = true;
    const duration = 500;
    const curve = AnimationCurve.easeInOut;
    this.queans.nativeElement.animate({translate:{x:1000, y:0}, duration, curve})
  }

  onPhone() {
    this.isPhone = true;
    const duration = 500;
    const curve = AnimationCurve.easeInOut;
    this.queans.nativeElement.animate({translate:{x:1000, y:0}, duration, curve})
  }

  onCloseAudience(){
    this.isAudience = false;
    this.isAnswerShown = false;
    const duration = 500;
    const curve = AnimationCurve.easeInOut;
    this.queans.nativeElement.animate({translate:{x:0, y:0}, duration, curve})
  }

  onClosePhone() {
    this.isPhone = false;
    const duration = 300;
    const curve = AnimationCurve.easeInOut;
    this.queans.nativeElement.animate({translate:{x:0, y:0}, duration, curve})

  }
}