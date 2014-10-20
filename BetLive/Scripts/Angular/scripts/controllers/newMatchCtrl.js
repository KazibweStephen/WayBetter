﻿bettingApp.controller('newMatchCtrl', ['$scope', 'dataService', '$rootScope',/* 'liveBetsSrvc',*/ function ($scope, dataService, $rootScope/*, liveBetsSrvc*/) {
    //$scope.betCategoryRows = new Array();
    //dataService.get("Match/getBetCategories").then(function (results) {
    //    var betCategories = betCategories || {};
    //    $scope.betCategories = new Array();
    //    angular.forEach(results, function (data, i) {
    //        $scope.betCategories.push(data);

    //    })

    //    // $scope.betCategories = betCategories;
    //    //matches.match=new Array();
    //    // matches.matches.push()

    //}, function (err) {
    //    $scope.message = err.error_description;
    //});


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////Matches///////////////////////////////////////////////////////
    $scope.query = "";
    $scope.matches = null;
    $scope.matchDistinct = function () {
        this.MatchNo = null;
        this.SetNo = null;
        this.Champ = null;
        this.OldDateTime = null;
        this.StartTime = null;
        this.GameStatus = null;
        this.AwayTeamId = null;
        this.HomeTeamId = null;
        this.RegistrationDate = null;
        this.HomeScore = null;
        this.AwayScore = null;
        this.HalfTimeHomeScore = null;
        this.HalfTimeAwayScore = null;
        this.ResultStatus = null;
        this.AwayTeamName = null;
        this.HomeTeamName = null;      
    }
       
    $scope.gameOdd = function (value) {
        this.BetCategory= 0,
        this.BetOptionId= 0,
        this.BetOption= 0,
        this.Odd='N/O'
        this.MatchNo= value.MatchNo,
        this.HandicapGoals=0
    };
        $scope.gameWithOddForEachCatRow = function () {
            this.matchDistinct = new $scope.matchDistinct();
            this.homeOdd = new $scope.gameOdd();
            this.drawOdd = new $scope.gameOdd();
            this.awayOdd = new $scope.gameOdd();
        }
        $scope.gameWithOddForEachCatRows = null;
    $scope.matchRow = function () {
        this.matchDistinct = new $scope.matchDistinct();
        this.GameOdds = new Array();
    }
    $scope.matchRows = null;
    $scope.betCategories = null;
    $scope.betCategoryRow = function () {
        this.CategoryName = null;
        this.matchOdds = null;
        this.match = null;
    };





    dataService.get("Match/GetMatches").then(function (results) {
        $scope.oddCategoryRow = function () {
            this.match = new $scope.matchDistinct();
            this.TotalOdds = null;
            this.oddHome = null;
            this.oddDraw = null;
            this.oddAway = null;
            //Fulltime Under over
           this.oddFtUnder05 = null;
           this.oddFtOver05 = null;
           this.oddFtUnder15 = null;
           this.oddFtOver15 = null;
           this.oddFtUnder25 = null;
           this.oddFtOver25 = null;
           this.oddFtUnder35 = null;
           this.oddFtOver35 = null;
           this.oddFtUnder45 = null;
           this.oddFtOver45 = null;
           this.oddFtUnder55 = null;
           this.oddFtOver55 = null;
            //Half Time 1X2
           this.oddht1 = null;
           this.oddhtx = null;
           this.oddht2 = null;
            //Halftime Under Over
           this.oddHtUnder05 = null;
           this.oddHtOver05 = null;
           this.oddHtUnder15 = null;
           this.oddHtOver15 = null;
           this.oddHtUnder25 = null;
           this.oddHtOver25 = null;
            //Double Chance
           this.oddDchd = null;
           this.oddDcha = null;
           this.oddDcda = null;
            //Handicup
           this.oddhc1  = null;
           this.oddhcx = null;
           this.oddhc2 = null;
            // Both Teams To Score
           this.oddgg = null;
           this.oddng = null;
        };
        $scope.oddCategoryRows = new Array();
        $scope.matches = new Array();
        angular.forEach(results, function (data, i) {
            var mRow = new $scope.matchRow();
            mRow.matchDistinct.MatchNo = data.MatchNo;
            mRow.matchDistinct.SetNo = data.SetNo;
            mRow.matchDistinct.Champ = data.Champ;
            mRow.matchDistinct.OldDateTime = data.OldDateTime;
            mRow.matchDistinct.StartTime = data.StartTime;
            mRow.matchDistinct.GameStatus = data.GameStatus;
            mRow.matchDistinct.AwayTeamId = data.AwayTeamId;
            mRow.matchDistinct.HomeTeamId = data.HomeTeamId;
            mRow.matchDistinct.RegistrationDate = data.RegistrationDate;
            mRow.matchDistinct.HomeScore = data.HomeScore;
            mRow.matchDistinct.AwayScore = data.AwayScore;
            mRow.matchDistinct.HalfTimeHomeScore = data.HalfTimeHomeScore;
            mRow.matchDistinct.HalfTimeAwayScore = data.HalfTimeAwayScore;
            mRow.matchDistinct.ResultStatus = data.ResultStatus;
            mRow.matchDistinct.AwayTeamName = data.AwayTeamName;
            mRow.matchDistinct.HomeTeamName = data.HomeTeamName;
            mRow.GameOdds = data.GameOdds;
            if(data.GameOdds.length!==0){
            $scope.matches.push(mRow);
        }

        });
        $scope.ft1X2Odds = getGameOddsByCategory("FT 1x2");
        $scope.ftUOOdds = getGameOddsByCategory("FT U/O");
        $scope.ht1X2Odds = getGameOddsByCategory("HT 1x2");
        $scope.htUOOdds = getGameOddsByCategory("HT U/O");
        $scope.doubleChanceOdds = getGameOddsByCategory("Double Chance");
        $scope.handicapOdds = getGameOddsByCategory("Handicap");
        $scope.bothTeamsToScoreOdds = getGameOddsByCategory("Both Teams To Score");
        $scope.firstTeamToScoreOdds = getGameOddsByCategory("First Team To Score");
        $scope.drawNoBetOdds = getGameOddsByCategory("Draw No Bet");
       

        angular.forEach($scope.matches, function (item, key) {
            var oddCategoryRow = new $scope.oddCategoryRow();
            oddCategoryRow.match = item.matchDistinct;
            oddCategoryRow.TotalOdds = item.GameOdds.length;
            //Full time 1X2
            oddCategoryRow.oddHome = getOddOptionInBetCategory($scope.ft1X2Odds, item.matchDistinct.MatchNo, 1);
            oddCategoryRow.oddDraw = getOddOptionInBetCategory($scope.ft1X2Odds, item.matchDistinct.MatchNo, 2);
            oddCategoryRow.oddAway = getOddOptionInBetCategory($scope.ft1X2Odds, item.matchDistinct.MatchNo, 3);
            //Fulltime Under over
            var _oddFtUnder05 = getOddOptionInBetCategory($scope.ftUOOdds,  item.matchDistinct.MatchNo, 32);
            oddCategoryRow.oddFtUnder05 = _oddFtUnder05 == null ?  new  $scope.gameOdd(item.matchDistinct) : _oddFtUnder05;
            var _oddFtOver05 = getOddOptionInBetCategory($scope.ftUOOdds, item.matchDistinct.MatchNo, 33);
            oddCategoryRow.oddFtOver05 = _oddFtOver05 == null ?  new  $scope.gameOdd(item.matchDistinct) : _oddFtOver05;
            var _oddFtUnder15 = getOddOptionInBetCategory($scope.ftUOOdds,  item.matchDistinct.MatchNo, 4);
            oddCategoryRow.oddFtUnder15 = _oddFtUnder15 == null ?  new  $scope.gameOdd(item.matchDistinct) : _oddFtUnder15;
            var _oddFtOver15 = getOddOptionInBetCategory($scope.ftUOOdds, item.matchDistinct.MatchNo, 5);
            oddCategoryRow.oddFtOver15 = _oddFtOver15 == null ?  new  $scope.gameOdd(item.matchDistinct) : _oddFtOver15;
            var _oddFtUnder25 = getOddOptionInBetCategory($scope.ftUOOdds,  item.matchDistinct.MatchNo, 6);
            oddCategoryRow.oddFtUnder25 = _oddFtUnder25 == null ?  new  $scope.gameOdd(item.matchDistinct) : _oddFtUnder25;
            var _oddFtOver25 = getOddOptionInBetCategory($scope.ftUOOdds, item.matchDistinct.MatchNo, 7);
            oddCategoryRow.oddFtOver25 = _oddFtOver25 == null ?  new  $scope.gameOdd(item.matchDistinct) : _oddFtOver25;
            var _oddFtUnder35 = getOddOptionInBetCategory($scope.ftUOOdds,  item.matchDistinct.MatchNo, 8);
            oddCategoryRow.oddFtUnder35 = _oddFtUnder35 == null ?  new  $scope.gameOdd(item.matchDistinct) : _oddFtUnder35;
            var _oddFtOver35 = getOddOptionInBetCategory($scope.ftUOOdds, item.matchDistinct.MatchNo, 9);
            oddCategoryRow.oddFtOver35 = _oddFtOver35 == null ?  new  $scope.gameOdd(item.matchDistinct) : _oddFtOver35;
            var _oddFtUnder45 = getOddOptionInBetCategory($scope.ftUOOdds, item.matchDistinct.MatchNo, 10);
            oddCategoryRow.oddFtUnder45 = _oddFtUnder45 == null ?  new  $scope.gameOdd(item.matchDistinct) : _oddFtUnder45;
            var _oddFtOver45 = getOddOptionInBetCategory($scope.ftUOOdds, item.matchDistinct.MatchNo, 11);
            oddCategoryRow.oddFtOver45 = _oddFtOver45 == null ?  new  $scope.gameOdd(item.matchDistinct) : _oddFtOver45;
            var _oddFtUnder55 = getOddOptionInBetCategory($scope.ftUOOdds, item.matchDistinct.MatchNo, 34);
            oddCategoryRow.oddFtUnder55 = _oddFtUnder55 == null ?  new  $scope.gameOdd(item.matchDistinct) : _oddFtUnder55;
            var _oddFtOver55 = getOddOptionInBetCategory($scope.ftUOOdds,  item.matchDistinct.MatchNo, 35);
            oddCategoryRow.oddFtOver55 = _oddFtOver55 == null ?  new  $scope.gameOdd(item.matchDistinct) : _oddFtOver55;
            //Half Time 1X2
            var _oddht1 = getOddOptionInBetCategory($scope.ht1X2Odds, item.matchDistinct.MatchNo, 12);
            oddCategoryRow.oddht1 = _oddht1 == null ?  new  $scope.gameOdd(item.matchDistinct) : _oddht1;
            var _oddhtx = getOddOptionInBetCategory($scope.ht1X2Odds, item.matchDistinct.MatchNo, 13);
            oddCategoryRow.oddhtx = _oddhtx == null ?  new  $scope.gameOdd(item.matchDistinct) : _oddhtx;
            var _oddht2 = getOddOptionInBetCategory($scope.ht1X2Odds, item.matchDistinct.MatchNo, 14);
            oddCategoryRow.oddht2 = _oddht2 == null ?  new  $scope.gameOdd(item.matchDistinct) : _oddht2;
            //Halftime Under Over
            var _oddHtUnder05 = getOddOptionInBetCategory($scope.htUOOdds, item.matchDistinct.MatchNo, 15);
            oddCategoryRow.oddHtUnder05 = _oddHtUnder05 == null ?  new  $scope.gameOdd(item.matchDistinct) : _oddHtUnder05;
            var _oddHtOver05 = getOddOptionInBetCategory($scope.htUOOdds,  item.matchDistinct.MatchNo, 16);
            oddCategoryRow.oddHtOver05 = _oddHtOver05 == null ?  new  $scope.gameOdd(item.matchDistinct) : _oddHtOver05;
            var _oddHtUnder15 = getOddOptionInBetCategory($scope.htUOOdds,  item.matchDistinct.MatchNo, 17);
            oddCategoryRow.oddHtUnder15 = _oddHtUnder15 == null ?  new  $scope.gameOdd(item.matchDistinct) : _oddHtUnder15;
            var _oddHtOver15 = getOddOptionInBetCategory($scope.htUOOdds, item.matchDistinct.MatchNo, 18);
            oddCategoryRow.oddHtOver15 = _oddHtOver15 == null ?  new  $scope.gameOdd(item.matchDistinct) : _oddHtOver15;
            var _oddHtUnder25 = getOddOptionInBetCategory($scope.htUOOdds, item.matchDistinct.MatchNo, 19);
            oddCategoryRow.oddHtUnder25 = _oddHtUnder25 == null ?  new  $scope.gameOdd(item.matchDistinct) : _oddHtUnder25;
            var _oddHtOver25 = getOddOptionInBetCategory($scope.htUOOdds, item.matchDistinct.MatchNo, 20);
            oddCategoryRow.oddHtOver25 = _oddHtOver25 == null ?  new  $scope.gameOdd(item.matchDistinct) : _oddHtOver25;
            //Double Chance
            var _oddDchd = getOddOptionInBetCategory($scope.doubleChanceOdds, item.matchDistinct.MatchNo, 21);
            oddCategoryRow.oddDchd = _oddDchd == null ?  new  $scope.gameOdd(item.matchDistinct) : _oddDchd;
            var _oddDcha = getOddOptionInBetCategory($scope.doubleChanceOdds, item.matchDistinct.MatchNo, 22);
            oddCategoryRow.oddDcha = _oddDcha == null ?  new  $scope.gameOdd(item.matchDistinct) : _oddDcha;
            var _oddDcda = getOddOptionInBetCategory($scope.doubleChanceOdds, item.matchDistinct.MatchNo, 23);
            oddCategoryRow.oddDcda = _oddDcda == null ?  new  $scope.gameOdd(item.matchDistinct) : _oddDcda;
            //Handicap
            var _oddhc1 = getOddOptionInBetCategory($scope.handicapOdds, item.matchDistinct.MatchNo, 24);
            oddCategoryRow.oddhc1 = _oddhc1 == null ?  new  $scope.gameOdd(item.matchDistinct) : _oddhc1;
            var _oddhcx = getOddOptionInBetCategory($scope.handicapOdds, item.matchDistinct.MatchNo, 31);
            oddCategoryRow.oddhcx = _oddhcx == null ?  new  $scope.gameOdd(item.matchDistinct) : _oddhcx;
            var _oddhc2 = getOddOptionInBetCategory($scope.handicapOdds, item.matchDistinct.MatchNo, 25);
            oddCategoryRow.oddhc2 = _oddhc2 == null ?  new  $scope.gameOdd(item.matchDistinct) : _oddhc2;
            // Both Teams To Score
            var _oddgg = getOddOptionInBetCategory($scope.bothTeamsToScoreOdds, item.matchDistinct.MatchNo, 26);
            oddCategoryRow.oddgg = _oddgg == null ?  new  $scope.gameOdd(item.matchDistinct) : _oddgg;
            var _oddng = getOddOptionInBetCategory($scope.bothTeamsToScoreOdds, item.matchDistinct.MatchNo, 27);
            oddCategoryRow.oddng = _oddng == null ?  new  $scope.gameOdd(item.matchDistinct) : _oddng;


            $scope.oddCategoryRows.push(oddCategoryRow);
        });
       

    }, function (err) {
        $scope.message = err.error_description;
    });

   
    //angular.forEach(getGameOddsByCategory("FT 1x2"), function (item, key) {
    //    $scope.ft1X2Odds.push(item);

    //});

    function getGameOddsByCategory(category) {
        var gameOdds = [];
        angular.forEach($scope.matches, function (item,index) {
            angular.forEach(item.GameOdds, function (value,key) {
                if (value.BetCategory === category) {
                    var gameodd =
                    {
                        BetCategory: value.BetCategory,
                        BetOptionId: value.BetOptionId,
                        BetOption: value.BetOption,
                        LastUpdateTime: value.LastUpdateTime,
                        Odd: (typeof value.Odd === 'undefined' || value.Odd === null) ? 0 : value.Odd,
                        MatchNo: item.matchDistinct.MatchNo,
                        HandicapGoals: (typeof value.HandicapGoals === 'undefined' ||  value.HandicapGoals === null) ? 0 : value.HandicapGoals
                    };
                    gameOdds.push(gameodd);
                }
            });
        });
        return gameOdds;
    }
    function getOddOptionInBetCategory(gameOdds, matchno, requiredOption) {
        var gameodd;
        angular.forEach(gameOdds, function (value,key) {
            if (value.MatchNo == matchno && value.BetOptionId == requiredOption) {
                gameodd = {
                    BetCategory: value.BetCategory,
                    BetOptionId: value.BetOptionId,
                    BetOption: value.BetOption,
                    Odd:  value.Odd === null ? 'NO' : value.Odd.toFixed(2),
                    MatchNo: value.MatchNo,
                    HandicapGoals: (typeof value.HandicapGoals === 'undefined'|| value.HandicapGoals === null) ? 0 : value.HandicapGoals,
                    
                };
            }
        });
        return gameodd;
    }






    ///////////////////////////////live games/////////////////////////////////////////////////


    // $scope.gameRow = function () {
    //    this.MatchNo = null;      
    //    this.Minutes=null;
    //    this.LocalTeam = null;
    //    this.AwayTeam = null;
    //    this.LocalTeamScore = null;
    //    this.AwayTeamScore = null;
    //    this.FullTimeOdds = {
    //        AwayWins: "N/A",
    //        Draw: "N/A",
    //        HomeWins: "N/A"
    //    },
    //    this.UnderOverOdds = {
    //        Under: "N/A",
    //        Over: "N/A",
    //        ExtraValue: "N/A"
    //    }
    //}
    //$scope.gameRows =null;
    //$scope.updatedGameRow = null;
    //liveBetsSrvc.init();
    //$rootScope.$on('getAllGames',function(e,games){
    //    $scope.$apply(function () {
    //        console.log(games);
    //        loopOverAllGames(games); 
        
    //    });
    //});

    //loopOverAllGames = function (games) {
    //    console.log(games);
    //    $scope.gameRows = new Array();
    //    angular.forEach(games,function(game,i){
    //        var gameRow = new $scope.gameRow();           
    //        gameRow.MatchNo = game.MatchNo
    //        gameRow.Minutes = game.Minutes
    //        gameRow.LocalTeam = game.LocalTeam
    //        gameRow.AwayTeam = game.AwayTeam
    //        gameRow.LocalTeamScore = game.LocalTeamScore
    //        gameRow.AwayTeamScore = game.AwayTeamScore
    //        if (game.FullTimeOdds == null) {
    //            gameRow.FullTimeOdds = gameRow.FullTimeOdds;
    //        }else{
    //            gameRow.FullTimeOdds.AwayWins = game.FullTimeOdds.AwayWins;
    //            gameRow.FullTimeOdds.Draw = game.FullTimeOdds.Draw;
    //            gameRow.FullTimeOdds.HomeWins = game.FullTimeOdds.HomeWins;           
            
    //        }

    //        if (game.UnderOverOdds == null) {
    //            gameRow.UnderOverOdds = gameRow.UnderOverOdds;
    //        }else{
    //            gameRow.UnderOverOdds.Under = game.UnderOverOdds.Under;
    //            gameRow.UnderOverOdds.Over = game.UnderOverOdds.Over;
    //            gameRow.UnderOverOdds.ExtraValue = game.UnderOverOdds.ExtraValue;  
    //        }
    //        $scope.gameRows.push(gameRow);
    //    });
    //}
   
    //$rootScope.$on('updateGame', function (e, game) {
    //    $scope.$apply(function () {
    //        mergeGame(game);

    //    });
    //});
   
    //mergeGame = function (game) {
    //    var gameRow = new $scope.gameRow();
    //    gameRow.MatchNo = game.MatchNo;
    //    gameRow.Minutes = game.Minutes;
    //    gameRow.LocalTeam = game.LocalTeam;
    //    gameRow.AwayTeam = game.AwayTeam;
    //    gameRow.LocalTeamScore = game.LocalTeamScore;
    //    gameRow.AwayTeamScore = game.AwayTeamScore;

    //    if (game.FullTimeOdds == null) {
    //        gameRow.FullTimeOdds = gameRow.FullTimeOdds;
    //    } else {           
    //        gameRow.FullTimeOdds.AwayWins = game.FullTimeOdds.AwayWins;
    //        gameRow.FullTimeOdds.Draw = game.FullTimeOdds.Draw;
    //        gameRow.FullTimeOdds.HomeWins = game.FullTimeOdds.HomeWins;
    //    }

    //    if (game.UnderOverOdds == null) {
    //        gameRow.UnderOverOdds = gameRow.UnderOverOdds;
    //    } else {

    //        gameRow.UnderOverOdds.Under = game.UnderOverOdds.Under;
    //        gameRow.UnderOverOdds.Over = game.UnderOverOdds.Over;
    //        gameRow.UnderOverOdds.ExtraValue = game.UnderOverOdds.ExtraValue;
    //    }
    //    $scope.updatedGameRow = gameRow;
    //    console.log(gameRow);
    //    //var objectRowToBeUpdated = $filter('filter')($scope.gameRows, { MatchNo: $scope.updatedGameRow.MatchNo });
    //    //objectRowToBeUpdated = $scope.updatedGameRow;
    //    //$scope.$apply();
    //    for(var i=0;i<$scope.gameRows.length;i++) {
    //        if ($scope.gameRows[i].MatchNo === gameRow.MatchNo)
    //       {                
    //            $scope.gameRows[i] = gameRow;
    //            console.log("updated");
    //            $scope.$apply();
    //           break;
    //       }

    //    }


    //};
}]);