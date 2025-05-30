import React, { Component } from 'react';
import Face from '../../../asset/img/Face.jpg'
import { Radio } from 'antd';

class Painscale extends Component {
    state = {
        value: 1,
      };
    
      onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
          value: e.target.value,
        });
      };
    render() {
        return (
            <div>
                <img src={Face} alt="Face" />
                <br />&nbsp;&nbsp;&nbsp;&nbsp;
                <Radio.Group onChange={this.onChange} value={this.state.value}>
                    <Radio value={1}>&nbsp;&nbsp;</Radio>
                    <Radio value={2}>&nbsp;&nbsp;</Radio>
                    <Radio value={3}>&nbsp;&nbsp;</Radio>
                    <Radio value={4}>&nbsp;&nbsp;</Radio>
                    <Radio value={5}>&nbsp;&nbsp;</Radio>
                    <Radio value={6}>&nbsp;&nbsp;</Radio>
                </Radio.Group><br />
            </div>
        );
    }
}

export default Painscale;