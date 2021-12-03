import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Livre } from '../livre';
import { LivreService } from '../livre.service';

@Component({
  selector: 'app-livres',
  templateUrl: './livres.component.html',
  styleUrls: ['./livres.component.css']
})
export class LivresComponent implements OnInit {

  lesLivres:Livre[]=[];
  livreForm: FormGroup= new FormGroup({});

  constructor(private livreService: LivreService,
    private fb:FormBuilder) { }

  ngOnInit(): void {
    this.livreForm = this.fb.group({
      titre:[''],
      prix:[0],
      nouveau:[false]

    })

    this.livreService.getLivres()
    .subscribe(
      livres => this.lesLivres = livres
    )
  }

  onSubmit(){
    this.livreService.ajouterLivre(this.livreForm.value)
    .subscribe(
      data => this.lesLivres.push(data)     
    )
  }

  onSupprimer(id:number){
    this.livreService.supprimerLivre(id)
    .subscribe(
      ()=> this.lesLivres = this.lesLivres.filter(l => l.id != id)
    )
  }

  onModifier(id:number){
    this.livreService.modifierLivre(id, this.livreForm.value)
    .subscribe(
      livre => {
         let pos = this.lesLivres.findIndex(l=> l.id == livre.id)
         this.lesLivres[pos]= this.livreForm.value   

      }           
    )
  }
}
