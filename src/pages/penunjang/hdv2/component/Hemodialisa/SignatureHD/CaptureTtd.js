import React from 'react';
import HdContext from '../../../HdContext';

const textBoxStyle = {
    width: "60mm",
    textAlign: "left",
    border: "1px solid #d3d3d3",
}

const btnStyle = {
    height: "30px",
    marginTop: "3px",
    marginBottom: "3px",
};

const boxStyle = {
    height: "35mm",
    width: "60mm",
    border: "1px solid #d3d3d3"
};

const {
    PasiensContext,
} = HdContext

export class Button extends React.Component {
    static contextType = PasiensContext;

    constructor(props) {
        super(props);
        this.state = { disabled: false };
    }
    handleOnChange(event) {
        if (this.props.id == "Restore") {
            // Disable the Restore button when required
            this.setState({
                disabled: event.target.value
            })
        }
    }
    render() {
        return (
            <div>
                <input
                    type="button"
                    id={this.props.id}
                    value={this.props.value}
                    // disabled={this.state.disabled} 
                    disabled={this.context.ktgTtd ? false : true}
                    style={btnStyle}
                    onChange={(event) => this.handleOnChange(event)}
                    onClick={this.props.funcName} />
            </div>
        );
    }
}

export class FirstName extends React.Component {
    static contextType = PasiensContext;

    constructor(props) {
        super(props);
        this.state = { firstName: "" };
    }

    handleOnChange(event) {
        this.setState({
            firstName: event.target.value
        })
        console.log('firstname', event.target.value);
    }

    componentDidMount() {
        this.setState({
            firstName: this.context.namattd1
        })
    }

    componentDidUpdate() {
        if (this.state.firstName !== this.context.namattd1) {
            this.setState({
                firstName: this.context.namattd1
            })
        }
    }

    render() {
        return (
            <div>
                {/* First name: <input type="text" id="fname" onChange={(event) => this.handleOnChange(event)} defaultValue={this.state.firstName} /> */}
            </div>
        );
    }
}

export class IsiB64 extends React.Component {
    static contextType = PasiensContext;

    constructor(props) {
        super(props);
        this.state = {
            codeB64: "",
        };
    }

    componentDidMount() {
        let item = this.context;
        console.log(item);
    }

    onChange(e) {
        this.context.setTtdPasien(e.target.value)

        this.setState({
            codeB64: e.target.value
        })
    }

    render() {
        return (
            <div>
                Base64 Code : <input type="text" onChange={(e) => this.onChange(e)} defaultValue={this.state.codeB64} />
            </div>
        )
    }
}

// This is the class for the scrolling text area showing progress messages to the user
export class UserMsgs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userMessage: ""
        };
        this.textLog = React.createRef();
    }

    componentDidUpdate() {
        this.textLog.current.scrollTop = this.textLog.current.scrollHeight; // Auto-scrolls to the bottom
    }

    handleOnChange(event) {
        console.log('coba', event.target.value);
        this.setState({
            userMessage: event.target.value
        })
    }

    render() {
        return (
            <div>
                <textarea ref={this.textLog} cols="125" rows="1" value={this.state.userMessage} onChange={(event) => this.handleOnChange(event)} style={textBoxStyle} />
            </div>
        );
    }
}

export class ImageBox extends React.Component {
    static contextType = PasiensContext;

    constructor(props) {
        super(props);
        this.state = {
            imageSrc: "",
            imgBase64: "",
            tempImgBase64: "",
            height: 135,
            width: 230
        };
    }

    componentDidUpdate() {
        if (this.state.tempImgBase64 !== this.state.imgBase64) {
            if (this.context.ktgTtd === "1") {
                this.context.setTtdPasien(this.state.imgBase64)
            }
            else if (this.context.ktgTtd === "2") {
                this.context.setTtdKeluargaPasien(this.state.imgBase64)
            }
            else {
                alert("Kategori Tanda Tangan belum dipilih!")
            }

            this.setState({
                tempImgBase64: this.state.imgBase64
            })
        }
    }

    render() {
        return (
            <div>
                <img id="imageBox" className="boxed" src={this.state.imageSrc} style={boxStyle} />
            </div>
        );
    }
}

class CaptureTtd extends React.Component {
    render() {
        return (
            <div className="App">
                <div style={{ width: "100%" }}>
                    <Button value="Capture" funcName={window.capture} title="Starts signature capture" />
                    <ImageBox ref={ImageBox => { window.ImageBox = ImageBox }} />
                    <UserMsgs ref={UserMsgs => { window.UserMsgs = UserMsgs }} />

                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <FirstName ref={FirstName => { window.FirstName = FirstName }} />
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        );
    }
}

export default CaptureTtd;