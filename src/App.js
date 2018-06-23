import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import friends from "./friends.json";
import "./App.css";

let correctGuess = 0;
let highScore = 0;
let alert = "Click on an image to earn points, but only once."

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    friends,
    correctGuess,
    highScore,
    alert
  };

  /* This is where the formula will check to see if the player has click on a friend and initiate shuffle and handle score */
  setClicked = id => {
    const friends = this.state.friends;

    const clickedMatch = friends.filter(match => match.id === id);

    if (clickedMatch[0].clicked){

      console.log("Correct guesses: " + correctGuess);
      console.log("Highscore: " + highScore);

      correctGuess = 0;
      alert = "Already clicked that one. GAMEOVER!"

      for (let i = 0; i < friends.length; i++) {
        friends[i].clicked = false;
      }

      this.setState({alert});
      this.setState({correctGuess});
      this.setState({friends});

    } else if (correctGuess < 11) {
      clickedMatch[0].clicked=true;

      correctGuess++;

      alert = "Nice Job! Keep Going!";

      if(correctGuess>highScore){
        highScore=correctGuess;
        this.setState({highScore});
      }
      this.setState({alert});
      this.setState({correctGuess});
      this.setState({friends});

      friends.sort (function(a, b) {return 0.5 - Math.random()});
    } else{
      clickedMatch[0].clicked = true;

      correctGuess = 0;

      alert = "Congratulations You Win!";

      highScore = 12;
      this.setState({highScore});
      
      for (let i =0; i <friends.length; i++){
        friends[i].clicked = false;
      }

      friends.sort (function(a, b) {return 0.5 - Math.random()});

      this.setState({friends});
      this.setState({correctGuess});
      this.setState({alert});
    }
  }

  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (
      <Wrapper>
        <Title>Test Your Memory</Title>
        <div className="col-12">
          <h4 className="score">
            {this.state.alert}
          </h4>
          <h4 className="score">
            Number of Correct Guesses: {this.state.correctGuess}
            <br />
            Highscore: {this.state.highScore}
          </h4>
        </div>
        
          {this.state.friends.map(friend => (
            <FriendCard
              setClicked={this.setClicked}
              id={friend.id}
              key={friend.id}
              image={friend.image}
            />
          ))}
        
      </Wrapper>
    );
  }
}

export default App;
