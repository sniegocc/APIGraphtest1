import { Component, Input } from "@angular/core";

@Component({
  selector: "people",
  templateUrl: "./people.template.html",
  styles: [
    `
      .box {
        max-width: 100px;
        height: 100px;
        margin: 2px;
        color: black;
        text-align: center;
        margin-left: auto;
        margin-right: auto;
      }
      .red {
        background-color: red;
      }
      .black {
        background-color: black;
        color: white;
      }
      .green {
        background-color: green;
      }
      .orange {
        background-color: orange;
      }
    `
  ]
})
export class PeopleComponent {
  @Input() p: any;
  @Input() from: any;
  @Input() to: any;
  @Input() notSet: any;
  getColor(person) {
    let bmi = this.bmi(person.mass, person.height);
    if (bmi < 16) {
      return "black";
    } else if (bmi >= 16 && bmi < 25) {
      return "green";
    } else if (bmi >= 25 && bmi < 40) {
      return "orange";
    } else {
      return "red";
    }
  }

  bmi(m, h) {
    return parseFloat(m) / ((parseFloat(h) * parseFloat(h)) / 10000);
  }
}
