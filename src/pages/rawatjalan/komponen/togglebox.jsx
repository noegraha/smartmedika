import React from "react";
import { Button } from "antd";


// const ToggleBox = () => {
// 	const [opened, setOpened] = useState(false);
// 	const onToggle = () => {
// 		setOpened(true);
// 	}
// 	return (
// 		<div className="box">
// 				<div className="boxTitle" >
// 					<Button size="small" onClick={onToggle}>{title}</Button>
// 				</div>
// 				{opened && (					
// 					<div class="boxContent">
// 						{children}
// 					</div>
// 				)}
// 			</div>
// 	)
// }
class ToggleBox extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			opened: false,
		};
		this.toggleBox = this.toggleBox.bind(this);
	}
  
	toggleBox() {
		const { opened } = this.state;
		this.setState({
			opened: !opened,
		});
	}
  
	render() {
		var { title, children } = this.props;
		const { opened } = this.state;

		if (opened){
			title ='Sembunyikan';
		}else{
			title ='Tampil';
		}

		return (
			<div className="box">
				<div className="boxTitle" >
					<Button size="small" onClick={this.toggleBox}>{title}</Button>
				</div>
				{opened && (					
					<div class="boxContent">
						{children}
					</div>
				)}
			</div>
		);
	}
}

export default ToggleBox;

