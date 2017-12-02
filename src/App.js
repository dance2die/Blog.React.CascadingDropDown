import React, { Component } from "react";
import _ from "lodash";

import { categories } from "./data";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      subcategories: [],

      selectedCategoryID: null,
      selectedSubcategoryID: null
    };
  }

  componentDidMount() {
    const categories = this.getCategories();
    const subcategories = this.getSubcategories();
    const selectedCategoryID = categories[0].CategoryID;
    const selectedSubcategoryID = subcategories.filter(
      category => category.CategoryID == selectedCategoryID
    )[0].SubcategoryID;

    this.setState({
      categories,
      subcategories,
      selectedCategoryID,
      selectedSubcategoryID
    });
  }

  getCategories() {
    return _.uniqBy(
      categories.map(category => {
        return {
          CategoryID: category.CategoryID,
          CategoryName: category.CategoryName
        };
      }),
      "CategoryID"
    );
  }

  getSubcategories() {
    return [
      ...categories.map(category => {
        return {
          CategoryID: category.CategoryID,
          SubcategoryID: category.SubcategoryID,
          SubcategoryName: category.SubcategoryName
        };
      })
    ];
  }

  handleCategoryChange = event => {
    const selectedCategoryID = event.target.value;
    const selectedSubcategoryID = this.state.subcategories.filter(
      category => category.CategoryID == selectedCategoryID
    )[0].SubcategoryID;

    this.setState({ selectedCategoryID, selectedSubcategoryID });
  };

  handleSubcategoryChange = event => {
    this.setState({ selectedSubcategoryID: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { categories, subcategories, selectedCategoryID, selectedSubcategoryID } = this.state;
    const categoryName = categories.filter(cat => cat.CategoryID == selectedCategoryID)[0].CategoryName;
    const subCategoryName = subcategories.filter(cat => cat.SubcategoryID == selectedSubcategoryID)[0].SubcategoryName;
    console.log("submit data", { categoryName, selectedCategoryID, subCategoryName, selectedSubcategoryID });
  };

  render() {
    const { categories, subcategories, selectedCategoryID } = this.state;
    if (categories.length === 0) return <div>Loading...</div>;

    const categoryOptions = categories.map(category => (
      <option key={category.CategoryID} value={category.CategoryID}>
        {category.CategoryName}
      </option>
    ));
    const subcategoryOptions = subcategories
      .filter(category => category.CategoryID == selectedCategoryID)
      .map(category => (
        <option key={category.SubcategoryID} value={category.SubcategoryID}>
          {category.SubcategoryName}
        </option>
      ));

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <select onChange={this.handleCategoryChange}>
            {categoryOptions}
          </select>
        </div>
        <div>
          <select onChange={this.handleSubcategoryChange}>
            {subcategoryOptions}
          </select>
        </div>

        <button type="submit">Submit</button>
      </form>
    );
  }
}
