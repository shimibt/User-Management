import React from 'react';


class Posts  extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            title : this.props.title,
            body : this.props.body
         }
    }
    render() { 

        const mainDivStyle =
        {
           border : 'solid black 1px',
           marginBottom : '5px'
        }
        return ( 
            <div>
                    <div className="mainDiv" style={mainDivStyle}>
                       title : {this.state.title} <br></br>
                       body : {this.state.body}
                    </div>
            </div>
        
         );
    }
}
 
export default Posts;