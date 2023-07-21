const itemModel = require('../model/product')
const logModel = require('../model/authentication')
const categoriesModel = require('../model/categories')
const path = require('path')
const fs = require('fs')
const cartModel = require('../model/cart')
const productModel = require('../model/product')
const favoriteModel = require('../model/favorite')

exports.getItem = async (req, res) => {
    try {
        const textSearch = req.query.textSearch
        const categories = req.query.categories
        const listData = categories ? await itemModel.find({ name: { $regex: textSearch, $options: 'i' } , 'categories':  categories })
        : await itemModel.find({ name: { $regex: textSearch, $options: 'i' } })
        res.send({
            listData
        })

    } catch (error) {
        res.send({ message: error.message })
    }
}

exports.getItemFav= async (req, res) => {
    try {
        const textSearch = req.query.textSearch
        const categories = req.query.categories
        const userName =  req.query.userName
        const itemFav = await favoriteModel.findOne({'userName':userName})
        const listId= itemFav.idProduct
        const listData = categories ? await itemModel.find({'_id': { $in: listId }, name: { $regex: textSearch, $options: 'i' } , 'categories':  categories })
        : await itemModel.find({'_id': { $in: listId }, name: { $regex: textSearch, $options: 'i' } })
        res.send({
            listData
        })

    } catch (error) {
        res.send({ message: error.message })
    }
}

exports.updateFav = async (req, res) => {
    try {
    const {userName,id} = req.body
    const data = await favoriteModel.findOne({'userName':userName})
    if (data){
        const check = data.idProduct.find(item => item === id)
        if (check){
            const listId = data.idProduct.filter(item => item !== id)
            await favoriteModel.findByIdAndUpdate(data._id,{idProduct : listId})
        }else{
            const listId = [...data.idProduct,id]
            await favoriteModel.findByIdAndUpdate(data._id,{idProduct : listId})
        }
    }else{
        await favoriteModel.create({userName:userName,idProduct:[id]})
    }
    res.send(true)
    } catch (error) {
        res.send({ message: error.message })
    }
}

exports.getCategories = async (req, res) => {
    try {
        const listData = await categoriesModel.find()
        res.send({
            listData
        })

    } catch (error) {
        res.send({ message: error.message })
    }
}

exports.postCategories = async (req, res) => {
    try {
        const data = req.body
        await categoriesModel.create(data)
        res.send({ data })
    } catch (error) {
        res.send({ message: error.message })
    }
}

exports.postItem = async (req, res) => {
    try {
        const data = req.body
        await itemModel.create(data)
        res.send({ data })
    } catch (error) {
        res.send({ message: error.message })
    }
}

exports.postCart = async (req, res) => {
    try {
        const data = req.body
        const checkGioHang  = await cartModel.findOne({'userName':data.userName})
        if (checkGioHang) {
            const cart = await cartModel.findById(checkGioHang._id)
            const checkProduct = cart.product.filter(item=> item.idProduct === data.idProduct)
            if(checkProduct.length > 0){
                const product = cart.product.map((item)=>{
                    if(item.idProduct === data.idProduct){
                    return {idProduct: item.idProduct, quantity: item.quantity + 1} 
                    } 
                    return item
                })
                await cartModel.findByIdAndUpdate(checkGioHang._id,{product : product})
            } else{
                const product = [...cart.product,{idProduct:data.idProduct,quantity: 1}]
                await cartModel.findByIdAndUpdate(checkGioHang._id,{product : product})
            }
        }else {
            await cartModel.create({userName:data.userName,product :[{ idProduct: data.idProduct,quantity: 1}]})
        }
        res.send({ data })
    } catch (error) {
        res.send({ message: error.message })
    }
}

exports.getCart = async (req, res) => {
    try {
        const userName = req.query.userName
        const cart = await cartModel.findOne({'userName':userName})
        let sum = 0
        const listId = cart.product.map((item)=>item.idProduct)
        const list = await productModel.find({ '_id': { $in: listId } })
        const listData =  cart ?  cart.product.map((item)=>{
            const product = list.find((itemPro)=>itemPro._id == item.idProduct)
             sum = sum + product.price * item.quantity
            return {
                product: product,
                quantity: item.quantity,
            }
        }) : []
        res.send({
            listData,sum:sum.toFixed(2)
        })
    } catch (error) {
        res.send({ message: error.message })
    }
}

exports.deleteCart = async (req, res) => {
    try {
        const data = req.body
        const cart = await cartModel.findOne({'userName':data.userName})
        const checkProduct = cart.product.find((item)=> item.idProduct === data.idProduct)
            if(checkProduct.quantity > 1){
                const product = cart.product.map((item)=>{
                    if(item.idProduct === data.idProduct){
                    return {idProduct: item.idProduct, quantity: item.quantity -1} 
                    } 
                    return item
                })
                await cartModel.findByIdAndUpdate(cart._id,{product : product})
            } else{
                const product = cart.product.filter(item=> item.idProduct !== data.idProduct)
                await cartModel.findByIdAndUpdate(cart._id,{product : product})
            }

        res.send(true)
    } catch (error) {
        res.send(error)
    }
}



exports.login = async (req, res) => {
    try {
        const { userName, password} = req.body
        const check = await logModel.findOne({ 'userName': userName , 'password': password })
        if (check) {
            res.send({status: 1, message: 'Đăng nhập thành công', userName: userName})
        }else {
            res.send({status: 0, message: 'Tài khoản hoặc mật chưa chính xác'})
        }
    } catch (error) {
        req.send(error)
    }
}

exports.register = async (req, res) => {
    try {
        const data = req.body
        const check = await logModel.findOne({ 'userName': data.userName })
        if (check) {
            res.send({status: 0, message: 'Đã tồn tại tài khoản'})
        }else {
            await logModel.create(data)
            res.send({status: 1, message: 'Đăng ký thành công' , userName: data.userName})
        }
    } catch (error) {
        req.send(error)
    }
}

exports.forgotPass = async (req, res) => {
    try {
        const data = req.body
        const check = await logModel.findOne({ 'userName': data.userName , 'phone': data.phone })
        if (check) {
            await logModel.findByIdAndUpdate(check._id,{password:data.password})
            res.send({status: 1, message: 'Đổi mật khẩu thành công' , userName: data.userName })
        }else {
            res.send({status: 0, message: 'Tài khoản hoặc số điện thoại đăng kí chưa chính xác'})
        }
    } catch (error) {
        req.send(error)
    }
}