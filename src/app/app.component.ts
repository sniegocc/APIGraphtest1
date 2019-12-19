import { Component, OnInit } from "@angular/core";
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Rx";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  public peopleList;
  public ranges;

  loaded = false;

  constructor(private http: Http) {}

  ngOnInit() {
    this.loadPeople();
  }

  public loadPeople(): Observable {
    this.peopleList = this.http
      .get("https://swapi.co/api/people/?page=4")
      .map(data => data.json())
      .subscribe(data => {
        this.peopleList = data.results;
        console.log(data.results);
        this.parseDates();
        this.sortByYear();
        this.ranges = this.getRanges(20);
        this.loaded = true;
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
    var ranges = [];
    var undef = [];
    var max = [];
    let from = 0,
      to = 100;
    for (from; from < to; from += step) {
      var people = [];
      var next = from + step;
      this.peopleList.forEach(eachObj => {
        //console.log(index)
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
        ranges.push({ from: from, to: next, people: people });
    }
    ranges.push({ from: to, to: false, people: max });
    ranges.push({ from: "undefined", to: false, people: undef });
    console.log(ranges);
    return ranges;
  }
}
