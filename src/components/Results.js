import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchKey, queryResults, queryLink } from '../redux/actions';
import Input from './common/presentational/Input.jsx';
import SingleResult from './common/presentational/SingleResult.jsx';
import Spinner from './common/spinner.jsx';
import Homepage from './Homepage';
import { ToastContainer, toast } from 'react-toastify';
// import ' react-toastify/dist/ReactToastify.css';
import '../../node_modules/react-toastify/dist/ReactToastify.css';

export class Results extends Component {
  constructor(props) {
    super(props);
    this.state = { spin: false };
  }

  handleClick() {
    this.setState({ spin: true });
    this.getResult();
  }
  getResult() {
    try {
      const { get } = require('axios');
      const apiOptions = {
        headers: {
          'x-rapidapi-host': 'faroo-faroo-web-search.p.rapidapi.com',
          'x-rapidapi-key': '1f778b39fcmshedfb4cd05ee9dd6p18bce6jsnd389bbc7715b'
        }
      };
      const BASE_URL =
        `https://faroo-faroo-web-search.p.rapidapi.com/api?q=` +
        this.props.queries.query;
      get(BASE_URL, apiOptions)
        .then(response => response.data)
        .then(res => {
          this.props.queryResults(res);
        this.setState({ spin: false });
        });
    } catch (error) {
      console.log('kujua ERROR:', err);
    }
  }
  componentDidMount() {
    this.getResult();
  }
  render() {
    const handleChange = ({ target }) => {
      this.props.searchKey(target.value);
    };

    return (
      <div className='top-search-box grid'>
        <ToastContainer />
        <div className='search-box'>
          <p className='side-title'>Kujua</p>
          <Input
            data-test='search'
            type='text'
            id='search-input'
            placeholder="I'm searching for ..."
            value={this.props.queries.query}
            handleChange={handleChange}
          />
          <Input
            data-testId='search-btn'
            value='Search'
            type='submit'
            id='search-btn'
            handleClick={() => this.handleClick()}
          />
        </div>
        { !this.state.spin && this.props.queries.results ? (
          this.props.queries.results.results ? (
            <div className='result-area'>
              <div>
                <div className='results-container span-row'>
                  <p className='n-results-fetched'>
                    Kujua fetched about{' '}
                    {this.props.queries.results.results.length} results
                  </p>
                  {this.props.queries.results.results.map((data, index) => (
                    <SingleResult
                      key={index}
                      resultTitle={data.title}
                      resultURL={data.url}
                      resultSubLink={data.url}
                      resultParagraph={data.kwic}
                    />
                  ))}
                </div>
              </div>
              {this.props.queries.results.results.length ? (
                <div className='pic-info-area'>
                  {this.props.queries && (
                    <div className='result-pic'>
                      <img
                        className='picture'
                        src={this.props.queries.results.results[0].iurl}
                      />
                    </div>
                  )}
                  <div className='result-short-info'>
                    {this.props.queries.results.results[0].kwic}
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>
          ) : (
            ' No results found'
          )
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}

export const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps, { searchKey, queryResults })(Results);
