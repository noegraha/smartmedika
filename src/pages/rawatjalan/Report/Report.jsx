import React, { PureComponent, Fragment } from "react";

export class Report extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      options: [
        {
          value: "-- Select report name --",
        },
        {
          value: "Matrix",
        },
        {
          value: "Master-Detail",
        },
        {
          value: "QR-Codes",
        },
        {
          value: "Highlight",
        },
        {
          value: "Image",
        },
      ],
    };
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
    this.name = event.target.value;
  };

  static createMarkup(name) {
    return {
      __html:
        '<iframe height="1000" width="1000" src="api/Report/DisplayReport?name=' +
        name +
        '" />',
    };
  }

  static getReport(name) {
    return <div dangerouslySetInnerHTML={Report.createMarkup(name)} />;
  }

  render() {
    const { options, value } = this.state;
    let contents = this.name ? Report.getReport(this.name) : <div />;

    return (
      <div>
        <div>
          <Fragment>
            <select onChange={this.handleChange} value={value}>
              {options.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.value}
                </option>
              ))}
            </select>
          </Fragment>
        </div>
        {contents}
      </div>
    );
  }
}
