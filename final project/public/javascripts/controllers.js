angular.module('cs411', ['ngRoute', 'ngCookies'])
    .directive('nameDisplay', function () {
        return {
            scope: true,
            restrict: 'EA',
            template: "<b>This can be anything {{name}}</b>"
        }
    })
    .controller('cs411ctrl', function ($scope, $http, $cookies) {

        //CREATE (POST)
        $scope.createUser = function () {
            if ($scope.dbID) {
                $scope.updateUser($scope.dbID)
            }
            else {
                const request = {
                    method: 'post',
                    url: 'http://localhost:3000/api/db',
                    data: {
                        NickName: $scope.NickName,
                        FullName: $scope.FullName,
                        Animation: $scope.Animation
                    }
                }
                $http(request)
                    .then(function (response) {
                            $scope.inputForm.$setPristine()
                            $scope.NickName = $scope.FullName = $scope.Animation = ''
                            $scope.getUsers()
                            console.log(response)
                        },
                        function (error) {
                            if (error.status === 401) {
                                $scope.authorized = false
                                $scope.h2message = "Not authorized to add "
                                console.log(error)
                            }
                        }
                    )
            }
        }
        //READ (GET)
        $scope.getUsers = function () {
            $http.get('http://localhost:3000/api/db')
                .then(function (response) {
                    $scope.users = response.data

                })
        }
        //UPDATE (PUT)
        $scope.setUserUpdate = function (user) {
            $scope.buttonMessage = "Update User"
            $scope.h2message = "Updating "
            $scope.NickName = user.NickName
            $scope.FullName = user.FullName
            $scope.dbID = user._id
            $scope.Animation = user.Animation

        }
        $scope.updateUser = function (userID) {
            const request = {
                method: 'put',
                url: 'http://localhost:3000/api/db/' + userID,
                data: {
                    NickName: $scope.NickName,
                    FullName: $scope.FullName,
                    Animation: $scope.Animation,
                    _id: userID
                }
            }
            $http(request)
                .then(function (response) {
                    $scope.inputForm.$setPristine()
                    $scope.NickName = $scope.FullName = $scope.Animation = ''
                    $scope.h2message = "Add user"
                    $scope.buttonMessage = "Add User"
                    $scope.getUsers()
                    $scope.dbID = null
                })

        }

        //DELETE (DELETE)
        $scope.deleteUser = function (_id) {

            const request = {
                method: 'delete',
                url: 'http://localhost:3000/api/db/' + _id,
            }
            $http(request)
                .then(function (response) {
                        $scope.inputForm.$setPristine()
                        $scope.NickName = $scope.FullName = $scope.Animation = ''
                        $scope.getUsers()
                    }
                )
        }

        // API call
        //Use the key to find the image associate with google
        $scope.getGoogle_1 = function(input){
            $http.get('http://localhost:3000/google/' + input)
                .then(function (response) {
                    $scope.google_image_old = false
                    $scope.google_image_hide = true
                    $scope.twitter_hide = true
                    $scope.youtube_hide = true
                    $scope.APIresult = response.data
//                    return $scope.APIresult

                })
        }

        // API call
        // Use the key to find the image by google search
        $scope.getGoogle = function(input){
            $http.get('http://localhost:3000/scraper/' + input)
                .then(function (response) {
                    $scope.google_image_hide = false
                    $scope.google_image_old = true
                    $scope.twitter_hide = true
                    $scope.youtube_hide = true
                    $scope.APIresult = response.data
//                    return $scope.APIresult

                })
        }

        // API call
        // Use the key to find the youtube video
        $scope.youtube = function(input){
            $http.get('http://localhost:3000/youtube/' + input)
                .then(function(response){
                    $scope.google_image_hide = true
                    $scope.google_image_old = true
                    $scope.twitter_hide = true
                    $scope.youtube_hide = false
                    $scope.APIresult = response.data
                })
        }
        // API call
        // Use the key find the twitter twits
        $scope.getTwitter = function(input){
            $http.get('http://localhost:3000/twitter/' + input)
                .then(function (response) {
                    $scope.twitter_hide = false
                    $scope.google_image_hide = true
                    $scope.google_image_old = true
                    $scope.youtube_hide = true
                    $scope.APIresult = response.data.statuses
                })
        }

        // Use the key to find the twitter location first
        // Then use the location to find the image
        $scope.comb = function(input, input1, input2){
            $http.get('http://localhost:3000/twitter/' + input)
                .then(function (response) {
                    $scope.APIresult = response.data.statuses[5].user.location
                    console.log($scope.APIresult)
                    $scope.google_image_hide = false
                    $scope.google_image_old = true
                    $scope.twitter_hide = true
                    $scope.youtube_hide = true
                })
                .then(function () {
                    //if($scope.APIresult != "") {
                        //$scope.APIresult = response.data
                        //$scope.APIresult = input1
                        $http.get('http://localhost:3000/scraper/' + $scope.APIresult)
                            .then(function (response) {
                                $scope.APIresult = response.data
                            })
                    //}
                })

        }

        // Use the key to find the image associated with google
        // then use the description to find the image
        $scope.comb_1 = function(input){
            $http.get('http://localhost:3000/google/' + input)
                .then(function(response){
                    $scope.google_image_hide = false
                    $scope.google_image_old = true
                    $scope.twitter_hide = true
                    $scope.youtube_hide = true
                    $scope.APIresult = response.data
                })
                .then(function(){
                    if( $scope.APIresult.length > 0 ){
                        $http.get('http://localhost:3000/scraper/' + $scope.APIresult[0].description)
                            .then(function(response){
                                $scope.APIresult = response.data
                            })
                    }
                })
        }

        // Use the key to find the image associated with google
        // then use the description to find the twitt
        $scope.comb_2 = function(input){
            $http.get('http://localhost:3000/google/' + input)
                .then(function(response){
                    $scope.google_image_hide = true
                    $scope.google_image_old = true
                    $scope.twitter_hide = false
                    $scope.youtube_hide = true
                    $scope.APIresult = response.data
                })
                .then(function(){
                    if( $scope.APIresult.length > 0 ){
                        $http.get('http://localhost:3000/twitter/' + $scope.APIresult[0].description)
                            .then(function(response){
                                $scope.APIresult = response.data.statuses
                            })
                    }
                })
        }

        // THis code will combine two API calls
        // It will find the twitter, and use the created time to find the image based on that
        $scope.comb_3 = function(input){
            $http.get('http://localhost:3000/twitter/' + input)
                .then(function (response) {
                    $scope.APIresult = response.data.statuses[0].created_at.slice(0,10)
                    console.log($scope.APIresult)
                    $scope.google_image_hide = false
                    $scope.google_image_old = true
                    $scope.twitter_hide = true
                    $scope.youtube_hide = true
                })
                .then(function () {
                    //if($scope.APIresult != "") {
                    //$scope.APIresult = response.data
                    //$scope.APIresult = input1
                    $http.get('http://localhost:3000/scraper/' + $scope.APIresult)
                        .then(function (response) {
                            $scope.APIresult = response.data
                        })
                    //}
                })

        }

        $scope.initApp = function ( ) {
            $scope.buttonState = "create"
            $scope.h2message = "Add user"
            $scope.buttonMessage = "Add User"
            $scope.authorized = false
            $scope.showLogin = false
            $scope.getUsers()
            //Grab cookies if present
            let authCookie = $cookies.get('authStatus')
            $scope.authorized = !!authCookie
            $scope.google_image_hide = true
            $scope.twitter_hide = true
            $scope.google_image_old = true
            $scope.youtube_hide = true
        }

        $scope.logout = function () {
            $http.get('/auth/logout')
                .then(function (response) {
                    $scope.authorized = false
                })
        }
        $scope.login = function () {
            const request = {
                method: 'post',
                url: 'http://localhost:3000/auth/login',
                data: {
                    username: $scope.username,
                    password: $scope.password
                }
            }
            $http(request)
                .then(function (response) {
                        $scope.authorized = true
                        $scope.showLogin = false
                    },
                    function (err) {
                        $scope.authorized = false
                    }
                )
        }

        $scope.register = function () {

            const request = {
                method: 'post',
                url: '/auth/register',
                data: {
                    name: $scope.name,
                    username: $scope.username,
                    password: $scope.password
                }
            }
            $http(request)
                .then(function (response) {
                        $scope.authorized = true
                        $scope.showLogin = false
                    },
                    function (error) {
                        if (error.status === 401) {
                            $scope.authorized = false
                            $scope.h2message = "Error registering"
                            console.log(error)
                        }
                    }
                )
        }

        $scope.showLoginForm = function () {
            $scope.showLogin = true
        }
        
        $scope.doTwitterAuth = function () {
            var openUrl = '/auth/twitter/'
            //Total hack, this:
            $scope.authorized = true
            window.location.replace(openUrl)

        }

    })
    .config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/:status', {
                templateUrl: '',
                controller: 'authController'
            })
                .when(':status', {
                    templateUrl: '',
                    controller: 'authController'
                })
            .otherwise({
                redirectTo: '/'
            })
        }])


.controller('authController', function ($scope) {

    let authStatus =  $location.search();
console.log(authStatus)
    console.log('In authController')
    $scope.authorized = !!authStatus

})


//This controller handles toggling the display of details in the user list
.controller('listController', function ($scope) {
    $scope.display = false
    $scope.showInfo = function () {
        $scope.display = !$scope.display
    }
})
