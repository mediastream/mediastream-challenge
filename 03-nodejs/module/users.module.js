var express = require('express');
var UserPresenter = require('./../presentation/presenter/users.presenter');
var GetAllUsersUseCase = require('./../domain/usecase/get_all_users.usecase');
var UserRepository = require('./../data/repository/user/user.repository');
var UserModel = require('./../data/models/User');
var UsersView = require('./../presentation/view/users');

class UserModule {
    constructor(middleware){
        this.middleware = middleware;
        this.userRepo = new UserRepository(UserModel);
        this.getAllUseCase = new GetAllUsersUseCase(this.userRepo);
        this.presenter = new UserPresenter(this.getAllUseCase);
        this.view = new UsersView(middleware, this.presenter);        
    }
}

module.exports = new UserModule(express());