import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import { applyMiddleware, createStore } from 'redux';
import Provider from 'react-redux';
import reducers from '../redux/reducers';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { searchKey, queryLink, queryResults } from '../redux/actions/index';
import {
  SEARCH_KEY,
  QUERY_LINK,
  QUERY_RESULTS
} from '../redux/actions/actionTypes';
import rootReducer from '../redux/reducers/index';
import searchReducers from '../redux/reducers/queries';
import Homepage from '../components/Homepage';

const middlewares = [thunk];
const testStore = state => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(
    createStore
  );
  return createStoreWithMiddleware(rootReducer, state);
};
const props = {
  searchKey: jest.fn()
};


// Actions
describe('Search action test suite', () => {
  it('it Should dispatch searchResults', () => {
    const searchKeyAction = {
      type: SEARCH_KEY,
      query: 'javascript'
    };
    const calledActions = searchKey('javascript');
    expect(calledActions).toEqual(searchKeyAction);
  });
  it('it Should dispatch query link', () => {
    const queryLinkAction = {
      type: QUERY_LINK,
      clicked: 'http://javascript.com'
    };
    const calledActions = queryLink('http://javascript.com');
    expect(calledActions).toEqual(queryLinkAction);
  });
  it('it Should dispatch query result', () => {
    const queryResultAction = {
      type: QUERY_RESULTS,
      results: 'http://javascript.com'
    };
    const calledActions = queryResults('http://javascript.com');
    expect(calledActions).toEqual(queryResultAction);
  });
});
// Reducers
describe('search reducer', () => {
  const searchKeyAction = {
    type: SEARCH_KEY,
    query: 'javascript'
  };
  const queryLinkAction = {
    type: QUERY_LINK,
    clicked: 'http://javascript.com'
  };
  const queryResultAction = {
    type: QUERY_RESULTS,
    results: 'http://javascript.com'
  };
  it('Should act on SEARCH_KEY', () => {
    const triggerState = searchReducers({}, searchKeyAction);
    expect(triggerState).toEqual({
      query: searchKeyAction.query
    });
  });
  it('Should act on QUERY_LINK', () => {
    const triggerState = searchReducers({}, queryLinkAction);
    expect(triggerState).toEqual({
      clicked: queryLinkAction.clicked
    });
  });
  it('Should act on QUERY_RESULTS', () => {
    const triggerState = searchReducers({}, queryResultAction);
    expect(triggerState).toEqual({
      results: queryResultAction.results
    });
  });
});

//  Components
describe('search components', () => {
  it('Should Mount Successfully', () => {
    const store = testStore({});
    const input = mount(
      <Router>
        <Homepage store={store} />
      </Router>
    );
    const page = input.find('input');
    page.simulate('change', { target: { value: 'js' } });
  });
});

test('reducers', () => {
  let state;
  state = reducers(
    { queries: { query: 'Hello world' } },
    {
      type: 'QUERY_RESULTS',
      results: {
        results: [
          {
            title: 'Hello world program - Wikipedia, the free encyclopedia',
            kwic:
              'A "Hello world" program is a computer program that outputs "Hello, world" on a display device . Because it is typically one of the simplest programs ...',
            content: '',
            url: 'http://en.wikipedia.org/wiki/Hello_world',
            iurl:
              'http://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Hello_World_Perl_GTk2_2012-12-04.png/220px-Hello_World_Perl_GTk2_2012-12-04.png',
            domain: 'en.wikipedia.org',
            author: '',
            news: false,
            votes: '1',
            date: 1391138476457,
            related: []
          },
          {
            title: 'Hello World - Twitter Blogs',
            kwic:
              '... a traditional Web advertising model bec... Skip to main content Blog Have an account? Sign in Search form Search All Twitter Blogs Hello World ...',
            content: '',
            url: 'http://blog.twitter.com/2010/04/hello-world.html ',
            iurl:
              'https://blog.twitter.com/sites/all/themes/gazebo/img/twitter-bird-white-on-blue.png',
            domain: 'blog.twitter.com',
            author: '',
            news: true,
            votes: '1',
            date: 1270072800000,
            related: []
          },
          {
            title: 'Hello world - Flickr - Photo Sharing!',
            kwic: 'This rat seems to be intrigued by my camera lens :-)',
            content: '',
            url: 'http://www.flickr.com/photos/57519914@N00/422469518',
            iurl:
              'http://farm1.staticflickr.com/127/422469518_46967ba194_z.jpg',
            domain: 'www.flickr.com',
            author: '',
            news: false,
            votes: '1',
            date: 1386105328600,
            related: []
          },
          {
            title: "Tiger Woods; 1996 'Hello World' press conference - YouTube",
            kwic:
              'On the eve of making his professional debut, Tiger Woods addressed the media at the 1996 Greater Milwaukee Open. Read the story /long-form/2 ...',
            content: '',
            url: 'https://www.youtube.com/watch?v=pLf3Gb5TcXs',
            iurl: 'https://i.ytimg.com/vi/pLf3Gb5TcXs/maxresdefault.jpg',
            domain: 'www.youtube.com',
            author: '',
            news: false,
            votes: '1',
            date: 1494953867169,
            related: []
          },
          {
            title: 'Hello world!',
            kwic:
              'Welcome to WordPress. This is your first post. Edit or delete it, then start blogging!',
            content: '',
            url: 'http://104.236.193.77/2015/07/25/hello-world/',
            iurl: '',
            domain: '104.236.193.77',
            author: 'frederic',
            news: true,
            votes: '10',
            date: 1437782581000,
            related: []
          },
          {
            title: 'Hello world, my name is Prince George',
            kwic:
              "Prince George is the most famous baby in the world but until his visit to Australia and New Zealand, he'd only been seen a few times.",
            content: '',
            url:
              'http://www.watoday.com.au/breaking-news-national/hello-world-my-name-is-prince-george-20140425-3790r.html',
            iurl:
              'http://images.watoday.com.au/2014/04/25/5377445/00-1aa-prince-thumb-20140425151913749529.jpg',
            domain: 'www.watoday.com.au',
            author: '',
            news: true,
            votes: '1',
            date: 1398376800000,
            related: []
          },
          {
            title:
              "'Hello World!' Comet-chasing spacecraft awakes after months of hibernation",
            kwic:
              'Waking up after almost three years of hibernation, a comet-chasing spacecraft sent its first signal back to Earth on Monday, prompting cheers ...',
            content: '',
            url:
              'http://www.ctvnews.ca/sci-tech/hello-world-comet-chasing-spacecraft-awakes-after-months-of-hibernation-1.1646794',
            iurl:
              'http://www.ctvnews.ca/polopoly_fs/1.1646800!/httpImage/image.jpg_gen/derivatives/landscape_620/image.jpg',
            domain: 'www.ctvnews.ca',
            author: '',
            news: true,
            votes: '1',
            date: 1390172400000,
            related: []
          },
          {
            title: 'Hello world!',
            kwic:
              'WordPress へようこそ。これは最初の投稿です。編集もしくは削除してブログを始めてください !',
            content: '',
            url: 'http://www.10e20.com/%e6%9c%aa%e5%88%86%e9%a1%9e/1.html',
            iurl: '',
            domain: 'www.10e20.com',
            author: 'next',
            news: true,
            votes: '10',
            date: 1380964596000,
            related: []
          },
          {
            title: 'German man programs "Hello World" into wheat field',
            kwic:
              'How exactly does one go about programming a crop field? Using lawnmowers, of … It\'s one thing to type code that produces a "Hello World" message ...',
            content: '',
            url:
              'http://arstechnica.com/journals/thumbs.ars/2007/06/11/german-programmer-programs-hello-world-into-wheat-field',
            iurl:
              'http://origin.arstechnica.com/journals/thumbs.media/cropfield.jpg',
            domain: 'arstechnica.com',
            author: '',
            news: true,
            votes: '1',
            date: 1181516400000,
            related: []
          },
          {
            title: 'Hello world!',
            kwic:
              'Welcome to WordPress.com ! This is your very first post. Click the Edit link to modify or delete it, or start a new post . If you like, use this ...',
            content: '',
            url: 'http://betabeat.com/2012/05/hello-world/',
            iurl:
              'http://s1.wp.com/wp-content/themes/vip/newyorkobserver/images/fb/betabeat.jpg?m=1341371507g',
            domain: 'betabeat.com',
            author: '',
            news: true,
            votes: '1',
            date: 1335826800000,
            related: []
          }
        ],
        query: 'Hello world',
        suggestions: [],
        count: 100,
        start: 1,
        length: 10,
        time: '11'
      }
    }
  );
  expect(state).toEqual({
    queries: {
      query: 'Hello world',
      results: {
        results: [
          {
            title: 'Hello world program - Wikipedia, the free encyclopedia',
            kwic:
              'A "Hello world" program is a computer program that outputs "Hello, world" on a display device . Because it is typically one of the simplest programs ...',
            content: '',
            url: 'http://en.wikipedia.org/wiki/Hello_world',
            iurl:
              'http://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Hello_World_Perl_GTk2_2012-12-04.png/220px-Hello_World_Perl_GTk2_2012-12-04.png',
            domain: 'en.wikipedia.org',
            author: '',
            news: false,
            votes: '1',
            date: 1391138476457,
            related: []
          },
          {
            title: 'Hello World - Twitter Blogs',
            kwic:
              '... a traditional Web advertising model bec... Skip to main content Blog Have an account? Sign in Search form Search All Twitter Blogs Hello World ...',
            content: '',
            url: 'http://blog.twitter.com/2010/04/hello-world.html ',
            iurl:
              'https://blog.twitter.com/sites/all/themes/gazebo/img/twitter-bird-white-on-blue.png',
            domain: 'blog.twitter.com',
            author: '',
            news: true,
            votes: '1',
            date: 1270072800000,
            related: []
          },
          {
            title: 'Hello world - Flickr - Photo Sharing!',
            kwic: 'This rat seems to be intrigued by my camera lens :-)',
            content: '',
            url: 'http://www.flickr.com/photos/57519914@N00/422469518',
            iurl:
              'http://farm1.staticflickr.com/127/422469518_46967ba194_z.jpg',
            domain: 'www.flickr.com',
            author: '',
            news: false,
            votes: '1',
            date: 1386105328600,
            related: []
          },
          {
            title: "Tiger Woods; 1996 'Hello World' press conference - YouTube",
            kwic:
              'On the eve of making his professional debut, Tiger Woods addressed the media at the 1996 Greater Milwaukee Open. Read the story /long-form/2 ...',
            content: '',
            url: 'https://www.youtube.com/watch?v=pLf3Gb5TcXs',
            iurl: 'https://i.ytimg.com/vi/pLf3Gb5TcXs/maxresdefault.jpg',
            domain: 'www.youtube.com',
            author: '',
            news: false,
            votes: '1',
            date: 1494953867169,
            related: []
          },
          {
            title: 'Hello world!',
            kwic:
              'Welcome to WordPress. This is your first post. Edit or delete it, then start blogging!',
            content: '',
            url: 'http://104.236.193.77/2015/07/25/hello-world/',
            iurl: '',
            domain: '104.236.193.77',
            author: 'frederic',
            news: true,
            votes: '10',
            date: 1437782581000,
            related: []
          },
          {
            title: 'Hello world, my name is Prince George',
            kwic:
              "Prince George is the most famous baby in the world but until his visit to Australia and New Zealand, he'd only been seen a few times.",
            content: '',
            url:
              'http://www.watoday.com.au/breaking-news-national/hello-world-my-name-is-prince-george-20140425-3790r.html',
            iurl:
              'http://images.watoday.com.au/2014/04/25/5377445/00-1aa-prince-thumb-20140425151913749529.jpg',
            domain: 'www.watoday.com.au',
            author: '',
            news: true,
            votes: '1',
            date: 1398376800000,
            related: []
          },
          {
            title:
              "'Hello World!' Comet-chasing spacecraft awakes after months of hibernation",
            kwic:
              'Waking up after almost three years of hibernation, a comet-chasing spacecraft sent its first signal back to Earth on Monday, prompting cheers ...',
            content: '',
            url:
              'http://www.ctvnews.ca/sci-tech/hello-world-comet-chasing-spacecraft-awakes-after-months-of-hibernation-1.1646794',
            iurl:
              'http://www.ctvnews.ca/polopoly_fs/1.1646800!/httpImage/image.jpg_gen/derivatives/landscape_620/image.jpg',
            domain: 'www.ctvnews.ca',
            author: '',
            news: true,
            votes: '1',
            date: 1390172400000,
            related: []
          },
          {
            title: 'Hello world!',
            kwic:
              'WordPress へようこそ。これは最初の投稿です。編集もしくは削除してブログを始めてください !',
            content: '',
            url: 'http://www.10e20.com/%e6%9c%aa%e5%88%86%e9%a1%9e/1.html',
            iurl: '',
            domain: 'www.10e20.com',
            author: 'next',
            news: true,
            votes: '10',
            date: 1380964596000,
            related: []
          },
          {
            title: 'German man programs "Hello World" into wheat field',
            kwic:
              'How exactly does one go about programming a crop field? Using lawnmowers, of … It\'s one thing to type code that produces a "Hello World" message ...',
            content: '',
            url:
              'http://arstechnica.com/journals/thumbs.ars/2007/06/11/german-programmer-programs-hello-world-into-wheat-field',
            iurl:
              'http://origin.arstechnica.com/journals/thumbs.media/cropfield.jpg',
            domain: 'arstechnica.com',
            author: '',
            news: true,
            votes: '1',
            date: 1181516400000,
            related: []
          },
          {
            title: 'Hello world!',
            kwic:
              'Welcome to WordPress.com ! This is your very first post. Click the Edit link to modify or delete it, or start a new post . If you like, use this ...',
            content: '',
            url: 'http://betabeat.com/2012/05/hello-world/',
            iurl:
              'http://s1.wp.com/wp-content/themes/vip/newyorkobserver/images/fb/betabeat.jpg?m=1341371507g',
            domain: 'betabeat.com',
            author: '',
            news: true,
            votes: '1',
            date: 1335826800000,
            related: []
          }
        ],
        query: 'Hello world',
        suggestions: [],
        count: 100,
        start: 1,
        length: 10,
        time: '11'
      }
    }
  });
});
