// qcm.component.ts
import { Component, OnInit } from '@angular/core';
import { QcmService } from '../qcm.service'; 
import { MatDialog } from '@angular/material/dialog'; 
import { ResultDialogComponent } from '../result-dialog/result-dialog.component'; 

@Component({
  selector: 'app-qcm',
  templateUrl: './qcm.component.html',
  styleUrls: ['./qcm.component.css']
})
export class QcmComponent implements OnInit {
  url: string = "";
  courseName: string = "";
  chapterName: string = "";

  qcms: any[] = [];
  qcmsa: any[] = [];

  totalCorrectAnswers: number = 0; 


  currentQuestionIndex: number = 0;
  selectedOption: string | null = null;
  showResult: boolean = false;

  selectedOptions: (string | null)[] = [];
  answeredQuestions: boolean[] = new Array(this.qcms.length).fill(false);


  constructor(private QcmService: QcmService,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.url = this.QcmService.getQcmUrl();
    this.courseName = this.QcmService.getcourseName();
    this.chapterName = this.QcmService.getchapterName();
    this.ExtractQCM();
  }

  

  GenerateQCM(): void {
    if (this.courseName && this.chapterName) {
      this.QcmService.GenerateQcm(this.courseName, this.chapterName)
        .subscribe(
          (data) => {
            console.log('Data received:', data);
            this.qcms = this.shuffleArray(data.qcms[0].quizzes); 
          },
          (error) => {
            console.error('Error fetching chapters:', error);
          }
        );
    }
  }
  

  


  ExtractQCM(): void {
    if (this.courseName && this.url && this.chapterName) {
      this.QcmService.ExtractQCM(this.url,this.courseName,this.chapterName) 
        .subscribe(
          (data) => {
            this.qcms = data;
            this.GenerateQCM();
          },
          (error) => {
            console.error('Error fetching :', error);
            this.GenerateQCM();
          }
        );
    }
  }

  onNextQuestion(): void {
    this.currentQuestionIndex++;
    this.selectedOption = null;
    this.showResult = false;    
  }

  onCheckAnswer(): void {
    if (this.selectedOption !== null) { // prevent user pass the next question until he pass the curent question
      this.selectedOptions[this.currentQuestionIndex] = this.selectedOption;
      this.answeredQuestions[this.currentQuestionIndex] = true;
    }

    if (this.selectedOption !== null) {
      this.selectedOptions[this.currentQuestionIndex] = this.selectedOption;
      this.answeredQuestions[this.currentQuestionIndex] = true;
    }
  
    const currentQuestion = this.qcms[this.currentQuestionIndex];
    if (this.selectedOption && this.selectedOption.charAt(0) === currentQuestion.answer) {
      this.totalCorrectAnswers++;
    }
    this.showResult = true;
  
    if (this.currentQuestionIndex === this.qcms.length - 1) {
      console.log(`You have ${this.totalCorrectAnswers} correct answer${this.totalCorrectAnswers !== 1 ? 's' : ''} from ${this.qcms.length}`);
      this.openResultDialog();
    }
  }
  

  

  /*onPreviousQuestion(): void {
    this.currentQuestionIndex--;
    this.selectedOption = null;
    this.showResult = false;
  }*/

  onPreviousQuestion(): void {
    this.currentQuestionIndex--;
    this.selectedOption = this.selectedOptions[this.currentQuestionIndex];
    this.showResult = this.answeredQuestions[this.currentQuestionIndex];
  }
  


  ResetQCM(): void {
    this.GenerateQCM();
    this.selectedOptions = Array(this.qcms.length).fill(null);
    this.answeredQuestions = new Array(this.qcms.length).fill(false);
    this.totalCorrectAnswers = 0;
    this.currentQuestionIndex = 0;
    this.selectedOption = null;
    this.showResult = false;
  }
  

  calculateAndLogScore(): void {
    const correctAnswers = this.qcms.reduce((count, qcm) => {
      if (qcm.selectedOption && qcm.selectedOption.charAt(0) === qcm.answer) {
        return count + 1;
      }
      return count;
    }, 0);
  
    console.log(`You have ${correctAnswers} correct answer(s) from ${this.qcms.length}`);
  }
  
    
 
  openResultDialog(): void {
    const dialogRef = this.dialog.open(ResultDialogComponent, {
      width: '300px', // Adjust the width as needed
      data: { totalCorrectAnswers: this.totalCorrectAnswers, totalQuestions: this.qcms.length }
    });
    this.ResetQCM();
  }

  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

}
