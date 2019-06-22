import { Component } from '@angular/core';
import dataJson from '../../assets/data.json';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor() {
    this.display = 'anual'
  }

  sectors: any[] = [
    { id: 0, name: 'Público' },
    { id: 1, name: 'Privado' }
  ];

  dependents: any[] = [
    { id: 0, name: '0' },
    { id: 1, name: '1' },
    { id: 2, name: '2' },
    { id: 3, name: '3' },
    { id: 4, name: '4' },
    { id: 5, name: '5 ou mais' }
  ];

  foodCard: any[] = [
    { id: 0, name: 'Sim' },
    { id: 1, name: 'Não' }
  ];

  maritalSituation: any[] = [
    { id: 0, name: 'Solteiro' },
    { id: 1, name: 'Casado, 1 Titular' },
    { id: 2, name: 'Casado, 2 Titulares' },
    { id: 3, name: 'Solteiro, Deficiente' },
    { id: 4, name: 'Casado - Deficiente, 1 Titular' },
    { id: 5, name: 'Casado - Deficiente, 2 Titulares' },
  ];

   /*   regions: any[] = [
      { id: 0, name: 'Continent' },
      { id: 1, name: 'Madeira' },
      { id: 2, name: 'Azores' }
    ]; */
 
  /* regionSelected = ''; */
  segurancaSocialTaxa = 11;
  adseTaxa = 0;
  maxSubsidioRefeicao = 4.77;
  maxSubsidioRefeicaoCartao = 7.63;
  subsidioAlimentacaoIsento = 0;
  subsidioAlimentacao = 0;
  public details: any;
  public selectOption: any;  
  sectorSelected = '';
  dependentsSelected = '';
  foodCardSelected = '';
  maritalSituationSelected = '';
  wageInput: any;
  wage: any;
  foodSubsidy: any;
  days: any;
  result: any;
  case: any[];
  tax: any;
  segurancaSocial:any;
  irs:any;
  display:any;
  adse:any;
 
  getTax(value) {
    this.case = dataJson[this.maritalSituationSelected][this.dependentsSelected];
    let keys = Object.keys(this.case);
    let values = Object.values(this.case);
    for (var i = keys.length - 1; i >= 0; i--) {
      if (value >= keys[i] && !this.tax) {
        this.tax = values[i + 1];
      }
    }
  }

  getValue() {
 
    if (this.foodCardSelected == '0') {
      this.subsidioAlimentacaoIsento = this.maxSubsidioRefeicaoCartao * this.days;
      this.subsidioAlimentacao = (this.foodSubsidy - this.maxSubsidioRefeicaoCartao) * this.days;
    } else {
      this.subsidioAlimentacaoIsento = this.maxSubsidioRefeicao * this.days;
      this.subsidioAlimentacao = (this.foodSubsidy - this.maxSubsidioRefeicao) * this.days;
    }

    if (this.sectorSelected == '0') {
      this.adseTaxa = 3.5;
    }else{
      this.adseTaxa = 0;
    }

    if (this.display == 'mensal'){
      this.wage = this.wageInput  + this.subsidioAlimentacao;
    }else{
      this.wage = this.wageInput / 14 + this.subsidioAlimentacao;
    }
    
    this.getTax(this.wage);
    this.segurancaSocial = (this.segurancaSocialTaxa/100) * this.wage;
    this.irs = (this.tax/100) * this.wage;
    this.adse = (this.adseTaxa/100) * this.wage;
    this.result = this.wage - this.segurancaSocial - (this.tax) / 100 * this.wage - this.adse + this.subsidioAlimentacaoIsento
  }

}
