import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.scss'],
})
export class SobreComponent implements OnInit {
  skills = [
    {
      titulo: 'HTML',
      nivel: 5,
    },
    {
      titulo: 'CSS3',
      nivel: 5,
    },

    {
      titulo: 'SASS',
      nivel: 5,
    },
    {
      titulo: 'Styled-Components',
      nivel: 3,
    },
    {
      titulo: 'Typescript',
      nivel: 4,
    },
    {
      titulo: 'Javascript',
      nivel: 4,
    },
    {
      titulo: 'Angular',
      nivel: 4,
    },
    {
      titulo: 'React.js',
      nivel: 3,
    },
    {
      titulo: 'React Native',
      nivel: 3,
    },
    {
      titulo: 'Java',
      nivel: 3,
    },
    {
      titulo: 'Spring Boot',
      nivel: 3,
    },
    {
      titulo: 'Node.Js',
      nivel: 4,
    },
    {
      titulo: 'Express',
      nivel: 3,
    },

    {
      titulo: 'C#',
      nivel: 2,
    },
    {
      titulo: '.NET',
      nivel: 2,
    },
    {
      titulo: 'Figma',
      nivel: 4,
    },
    {
      titulo: 'Jest',
      nivel: 4,
    },
    {
      titulo: 'Jasmine',
      nivel: 4,
    },
    {
      titulo: 'Bootstrap',
      nivel: 5,
    },
    {
      titulo: 'Material',
      nivel: 5,
    },
  ];

  constructor() { }

  ngOnInit(): void { }

  getFilledCircles(nivel: number): number[] {
    return Array(nivel).fill(0);
  }

  getEmptyCircles(nivel: number): number[] {
    return Array(5 - nivel).fill(0);
  }
}
