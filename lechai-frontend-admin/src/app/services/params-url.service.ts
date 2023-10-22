import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParamInfoResume } from 'src/Interface';

@Injectable({
  providedIn: 'root'
})
export class ParamsURLService {

  name: string|null = null;
  filtres: ParamInfoResume[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(){
    this.getParamURL();
  }

  getParamURL(){
    this.route.paramMap.subscribe(params => {
      this.name = params.get('name');
      /* filtres = params.get('filters'); */
    });
  }

  returnParamsURL(){
    return this.name;
  }
}
