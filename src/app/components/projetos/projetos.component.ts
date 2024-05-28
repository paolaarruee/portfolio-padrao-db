import { Component } from '@angular/core';

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.scss'],
})
export class ProjetosComponent {
  projetos = [
    {
      titulo: 'Dragopédia',
      descricao:
        'Projeto front-end responsivo desenvolvido com React, Styled Components e Vite.',
      github: 'https://github.com/paolaarruee/Dragopedia',
      imagem: '../../../assets/img/projetos/dragopedia.png',
    },
    {
      titulo: 'Gerenciamento de Votação Front',
      descricao: 'Aplicação Angular com testes unitários em Karma e Jasmine.',
      github: 'https://github.com/paolaarruee/votacao-front',
      imagem: '../../../assets/img/projetos/gerenciador-votacao-front.png',
    },
    {
      titulo: 'Gerenciamento de Votação Back',
      descricao:
        'Back-end Node.js com MySQL e SQLite para testes, utilizando Knex, Yup e Jest.',
      github: 'https://github.com/paolaarruee/desafio-back-DB',
      imagem: '../../../assets/img/projetos/votacao.png',
    },
    {
      titulo: 'Aprendendo Inglês',
      descricao:
        'Sistema Angular para aprendizagem de inglês, utilizando Bootstrap.',
      github: 'https://github.com/paolaarruee/desafio-back-DB',
      imagem: '../../../assets/img/projetos/aprendendoingles.png',
    },
    {
      titulo: 'Naruto Java',
      descricao:
        'Sistema Java para cadastro de personagens e simulação de batalhas.',
      github: 'https://github.com/paolaarruee/naruto-java',
      imagem: '../../../assets/img/projetos/naruto-java.png',
    },
    {
      titulo: 'Portfolio Pessoal',
      descricao:
        'Meu portfólio pessoal desenvolvido com CSS, HTML e JavaScript.',
      link: 'https://paola-arruee.netlify.app/',
      github: 'https://github.com/paolaarruee/portfolio',
      imagem: '../../../assets/img/projetos/portfolio-pessoal.png',
    },
    {
      titulo: 'Portfolio DB',
      descricao:
        'Meu portfólio pessoal com layout concebido pela DB, utilizando Angular Material e SCSS.',
      github: 'https://github.com/paolaarruee/portfolio',
      imagem: '../../../assets/img/projetos/naruto-java.png',
    },
  ];
}
