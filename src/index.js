import _ from "lodash";
import React, {Component} from "react";
import ReactDOM from "react-dom";
import YTSearch from "youtube-api-search"
import SearchBar from "./components/search_bar";
import VideoList from "./components/video_list";
import VideoDetail from "./components/video_detail";
const API_KEY = "AIzaSyB4zLuS4v4y577DnhNq7CxiVT7YftUV8ws";

// Create a new component. This component should produce some HTML

class App extends Component{
  constructor(props){
    super(props);

    this.state = { videos: [],
    selectedVideo: null
   };

   this.videoSearch("surfboards");
  }

videoSearch(term){
  YTSearch({key: API_KEY, term: term}, (videos) =>{
      this.setState({
      videos: videos,
      selectedVideo: videos[0]
    });
  });
}


  render(){
    // debounce will return a new function that can only be called once every 300ms
    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);

    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch}/>
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList
          // passing a function that manipulates another componenent
          // we are passing it as a property to videolist
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos} />
      </div>
    );
  }
}


//Take this compent's HTML and put it on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector(".container"));
