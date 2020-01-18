import { Component, OnInit } from "@angular/core";
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/map";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  public peopleList = [];
  public ranges;
  public peopleTemp;
  url = "https://swapi.co/api/people/";

  loaded = false;

  constructor(private http: Http) {}

  ngOnInit() {
    this.loadPeople();
  }

  public loadPeople() {
    this.peopleTemp = this.http
      .get(this.url)
      .map(data => data.json())
      .subscribe(data => {
        this.peopleList = this.peopleList.concat(data.results);
        this.url = data.next;
        if (this.url != null) {
          this.loadPeople();
        } else {
          this.parseDates();
          this.sortByYear();
          this.ranges = this.getRanges(20);
          this.loaded = true;
        }
      });
  }
  parseDates() {
    this.peopleList.forEach(eachObj => {
      eachObj.birth_year = parseFloat(eachObj.birth_year.replace("BBY", ""));
    });
  }
  sortByYear() {
    this.peopleList.sort((a, b) => {
      if (a.birth_year < b.birth_year) return -1;
      else if (a.birth_year > b.birth_year) return 1;
      else return 0;
    });
  }

  getRanges(step) {
    let ranges = [],
      undef = [],
      max = [],
      from = 0,
      to = 100;
    for (from; from < to; from += step) {
      let people = [];
      let next = from + step;
      this.peopleList.forEach(eachObj => {
        if (eachObj.birth_year >= from && eachObj.birth_year < next) {
          people.push(eachObj);
        }
        if (next == to && eachObj.birth_year >= to) {
          max.push(eachObj);
        }
        if (next == to && isNaN(eachObj.birth_year)) {
          undef.push(eachObj);
        }
      });
      ranges.push({ from: from, to: next, postfix: "BBY", people: people });
    }
    ranges.push({ from: to, to: false,postfix: "BBY++", people: max });
    ranges.push({ from: "undefined", to: false, postfix: "", people: undef });
    return ranges;
  }
}
