angular.module("speaking").controller(
  "ConversationController",
  [
    "$scope", function($scope) {
      $scope.player1 = window.people[0];
      $scope.player2 = window.people[1];
      $scope.newGame = true;
      $scope.chooseTopic = false;
      $scope.topic = undefined;
      setTimeout(greeting, 500)
      $scope.recognition = initializeSpeechRecognition();

      $scope.getStarted = function(){
        responsiveVoice.pause();
        $scope.newGame = false;
        resetCurrentPlayer();
        chooseTopic();
      }

      function initializeSpeechRecognition(){
        let final_transcript;
        let recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.onresult = function(event) {
          var interim_transcript = '';

          for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              final_transcript += event.results[i][0].transcript;
            } else {
              interim_transcript += event.results[i][0].transcript;
            }
          }
          console.log(final_transcript);
        }

        recognition.start();
        return recognition;
      }

      //function capitalize(s) {
        //return s.replace(first_char, function(m) { return m.toUpperCase(); });
      //}

      function chooseTopic(){
        $scope.chooseTopic = true;
        setTimeout(askTopic, 1500)
      }

      function askTopic(){
        let message = `${$scope.currentPlayer}, what issue are you most concerned about?`;
        talk(message);
      }

      function resetCurrentPlayer(){
        if($scope.currentPlayer == $scope.player1) {
          $scope.currentPlayer = $scope.player2;
        } else {
          $scope.currentPlayer = $scope.player1;
        }
      }

      function greeting(){
        welcomeUser();
        explainRules();
        promptGameStart();
      }

      function explainRules(){
        let message = `
          My name is Anne and my goal is to make sure your political discussion is friendly and fruitful.
          There's a few ground rules for us all to follow, and I'll be chiming in when I think their might be a violation.
          Rule 1. Let’s discuss the issues of the day and leave personal scandals out of it.
          Rule 2. Let's make sure we listen to each other. When it's your turn to respond, pause
          and reflect on what the other person has said.
          Rule 3. This is the most important rule. Name calling and inflammatory language will
          not be tolerated.
        `

        talk(message);
      }

      function welcomeUser(){
        let message = `Hi ${people.join(" and ")}`;
        talk(message);
      }

      function promptGameStart(){
        let message = "If you both agree to these ground rules, then click Go to get started.";
        talk(message);
      }

      function talk(message){
        responsiveVoice.speak(message);
      }
    }
  ]
)
