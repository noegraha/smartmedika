import React, { Component } from 'react';
import { Slider, InputNumber } from 'antd';
const marks = {
    0: '0',
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    7: '7',
    8: '8',
    9: '9',
    10: '10'
};

class Scaleslider extends Component {
    state = {
        inputValue: 1,
    };

    onChange = value => {
        this.setState({
            inputValue: value,
        });
    };
    render() {
        const { inputValue } = this.state;

        return (
            <div>
                <Slider min={0} max={10} marks={marks} defaultValue={0} onChange={this.onChange}
                    value={typeof inputValue === 'number' ? inputValue : 0} style={{ width: '40vh' }} />
                <InputNumber
                    min={0}
                    max={10}
                    style={{ marginLeft: 16 }}
                    step={1}
                    value={inputValue}
                    onChange={this.onChange}
                />
            </div>
        );
    }
}

export default Scaleslider;