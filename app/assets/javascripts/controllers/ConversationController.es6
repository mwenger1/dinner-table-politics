angular.module("speaking").controller(
  "ConversationController",
  [
    "$scope", function($scope) {
      $scope.player1 = window.people[0];
      $scope.player2 = window.people[1];
      $scope.newGame = true;
      $scope.chooseIssue = false;
      $scope.topic = undefined;
      setTimeout(greeting, 500)
      $scope.issues = [
        "Abortion",
        "Civil Rights",
        "Climate Change",
        "Economic Policy",
        "Education",
        "Foreign Policy",
        "Goverment Programs",
        "Gun Control",
        "Healthcare",
        "Immigration",
        "Taxes",
        "Trade",
      ]

      $scope.getStarted = function(){
        responsiveVoice.pause();
        $scope.newGame = false;
        resetCurrentPlayer();
        chooseIssue();
      }

      function initializeSpeechRecognition(){
        window.recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

        return window.recognition;
      }

      function chooseIssue(){
        $scope.chooseIssue = true;
        identifyIssue();
        setTimeout(askIssue, 1500)
      }

      function identifyIssue(){
        return listenForText($scope.issues);
      }

      function listenForText(text_strings){
        recognition = initializeSpeechRecognition();
        recognition.onresult = function(event) {
          let interim_transcript = '';

          $scope.issue = "Civil Rights";
          $scope.$apply();
          for (var i = event.resultIndex; i < event.results.length; ++i) {
            let eventTranscript = event.results[i][0].transcript;
            let matches = containsAny(eventTranscript, text_strings);
            console.warn(matches);
            if(matches){
              $scope.issue = matches;
            }
            console.warn(eventTranscript);
          }
        }
        recognition.start();

        return recognition;
      }

      function containsAny(str, substrings) {
        var str = str.toLowerCase();
        for (var i = 0; i != substrings.length; i++) {
          var substring = substrings[i].toLowerCase();
          if (str.indexOf(substring) != - 1) {
            return substring;
          }
        }
        return null;
      }

      function askIssue(){
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
          My goal is to help you have a constructive, political discussion.
          There's a few ground rules to follow and I will chime in when they are broken.
          Rule 1. Discuss issues, not personal scandals.
          Rule 2. Listen to each other and lead with followup questions rather than defensive statements.
          Rule 3. Avoid attacks and hurtful language.
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
