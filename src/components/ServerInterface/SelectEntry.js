import React from 'react';
class SelectEntry extends React.Component{
    render(){
        const {entry} = this.props;
        return(
            <option value={entry}>
                {entry}
            </option>
        );
    }
}

export default SelectEntry;