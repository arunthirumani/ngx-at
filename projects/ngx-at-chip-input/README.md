# Usage notes:
### Using form control as input
chipList = new FormControl();  
chipList.setValue(['test1', 'chip1', 'another chip']);  
  
<ngx-at-chip-input placeholder="custom placeholder" [formControl]="chipList">  
\</ngx-at-chip-input>  

### Using array as input
chipArray=['Hydrogen', 'Helium', 'Lithium', 'Berilium'];  
  
\<ngx-at-chip-input  
 &nbsp;&nbsp;placeholder="custom placeholder"   
 &nbsp;&nbsp;[chipArray]="chipArray"  
 &nbsp;&nbsp;(chipListChange)="chipListChangeHandler($event)"  
\>  
\</ngx-at-chip-input> 

# How does it look and feel?
![Chip Input Image](https://github.com/arunthirumani/ngx-at/blob/arun-no-formControl-support/projects/demo/src/assets/chip-input.png)

# Live Demo  
[Click to see Live Demo](https://stackblitz.com/edit/angular-8-getting-started-9tjibe?file=src%2Fapp%2Fapp.component.ts)   

