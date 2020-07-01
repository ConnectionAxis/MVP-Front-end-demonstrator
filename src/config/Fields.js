import { Component } from "react";
import Util from "../utils/Util.js";
import data from "./FieldsData.json";

export default class Fields extends Component {
  static getField(name, field) {
    if (!Util.isEmpty(name)) {
      switch (name) {
        case "focus_areas":
        case "research_areas":
          return data[name];
        case "categories_topics":
          var output = [];
          Util.eachInObject(data.categories_topics, (category, topics) => {
            Util.eachInArray(topics, (topic) => {
              output.push({ topic: topic, category: category });
            });
          });
          return output;
        case "categories":
          return Object.keys(data.categories_topics);
        case "topics":
          if (!Util.isEmpty(field)) {
            return data.categories_topics[field];
          } else {
            console.error(
              "[E] Fields.getField(%name%, %field%) - no field argument passed."
            );
            return [];
          }
        default:
      }
    } else {
      console.error("[E] Fields.getField(%name%) - no field name passed.");
      return [];
    }
  }
}
