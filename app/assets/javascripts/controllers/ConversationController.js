angular.module("speaking").controller(
  "ConversationController",
  ["$scope", function($scope) {
    $scope.newGame = true;
    setTimeout(greeting, 500)

    function greeting(){
      welcomeUser();
      explainRules();
      promptGameStart();
    }

    function explainRules(){
      message = " \
        My name is Anne and my goal is to make sure your political discussion is friendly and fruitful. \
        There's a few ground rules for us all to follow, and I'll be chiming in when I think their might be a violation. \
        Rule 1. Let’s discuss the issues of the day and leave personal scandals out of it. \
        Rule 2. Let's make sure we listen to each other. You will pick issues and I'll be passing the talking stick \
        back and forth. When it's your turn, pause and reflect on what the other person said. \
        Ask questions rather than make statements. Avoid jumping to a different topic. \
        Rule 3. This is the most important rule. Name calling and inflammatory language will \
        not be tolerated. \
      "

      talk(message);
    }

    function welcomeUser(){
      message = "Hi " + people.join(" and ");
      talk(message);
    }

    function promptGameStart(){
      var message = "If you both agree to these ground rules, then click Go to get started.";
      talk(message);
    }

    function talk(message){
      responsiveVoice.speak(message);
    }
  }
  ]
)
