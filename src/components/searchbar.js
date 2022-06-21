import React from 'react';

// class component
class SearchBar extends React.Component {

    onInputChange(e) {
       this.props.inputChange(e);
    }

    onFormSubmit(e) {
        e.preventDefault();
        this.props.formSubmitted();
    }

    render() {
        const location = this.props.location;

        return(
            <form onSubmit={(e) => this.onFormSubmit(e)}>
                {/*<button type="submit">Search</button>*/}
                
                <input type="search" id="search" name="search" value={location} onChange={(e) => this.onInputChange(e)} />
            </form>
        )
    }

}

export default SearchBar;